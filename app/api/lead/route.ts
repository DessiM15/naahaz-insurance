import { NextResponse } from "next/server";
import { leadSubmitSchema } from "@/lib/leads/schema";
import { getLeadProvider } from "@/lib/leads/provider";

export const runtime = "nodejs";

/**
 * Lead intake.
 *
 * Three layers of spam defence, none of which a real person ever sees:
 *   1. Honeypot  — a hidden `company` field. Bots fill it, humans can't.
 *   2. Timing    — anything submitted in under 3 seconds wasn't typed.
 *   3. Rate limit — 10 submissions per IP per hour.
 *
 * No CAPTCHA, no third-party keys, no privacy trade-off.
 *
 * The limit is 10 rather than 5 because a single household can legitimately
 * touch this endpoint several times in one visit — the contact form, the
 * booking flow and Ava all post here — and offices and homes frequently share
 * one NAT address. Bots send orders of magnitude more than 10, so the ceiling
 * still does its job.
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const MIN_FILL_MS = 3000;

/**
 * In-memory rate limit. Adequate for a single-region deployment; if the site
 * ever scales horizontally this wants moving to Redis or Vercel KV.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call us instead." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = leadSubmitSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again.", field: first?.path?.[0] },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot. Answer 200 so the bot believes it succeeded and moves on.
  if (lead.company) {
    console.warn("[lead] honeypot triggered", { ip });
    return NextResponse.json({ ok: true, id: "ok" });
  }

  // Timing check. Same silent success.
  if (lead.startedAt && Date.now() - lead.startedAt < MIN_FILL_MS) {
    console.warn("[lead] submitted too fast", { ip, ms: Date.now() - lead.startedAt });
    return NextResponse.json({ ok: true, id: "ok" });
  }

  const provider = getLeadProvider();
  const id = `lead_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

  const result = await provider.submit({
    ...lead,
    company: undefined,
    startedAt: undefined,
    id,
    receivedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    console.error("[lead] provider failed", provider.name, result.error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send that. Please call us and we'll take the details directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}

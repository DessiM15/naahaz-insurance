import type { Lead } from "./schema";

/**
 * Where leads go.
 *
 * The site ships with the console provider so the full submission flow works
 * end to end without any third-party account. Switching to a real destination
 * is one environment variable — no code changes anywhere else.
 *
 *   LEAD_PROVIDER=console   (default — logs + appends to .leads.jsonl)
 *   LEAD_PROVIDER=resend    (needs RESEND_API_KEY + LEAD_TO_EMAIL)
 *   LEAD_PROVIDER=webhook   (needs LEAD_WEBHOOK_URL)
 */

export type LeadResult = { ok: true; id: string } | { ok: false; error: string };

export interface LeadProvider {
  readonly name: string;
  submit(lead: Lead & { receivedAt: string; id: string }): Promise<LeadResult>;
}

/* -------------------------------------------------------------------------
   console — the default. Writes to the server log and to .leads.jsonl so a
   submission can actually be inspected during review.
   ------------------------------------------------------------------------- */
const consoleProvider: LeadProvider = {
  name: "console",
  async submit(lead) {
    const line = JSON.stringify(lead);
    console.info("[lead] received\n" + JSON.stringify(lead, null, 2));

    try {
      // Node-only, and deliberately dynamic so the module stays edge-safe.
      const { appendFile } = await import("node:fs/promises");
      await appendFile(".leads.jsonl", line + "\n", "utf8");
    } catch (err) {
      // A failed local write must never lose the lead — the log above stands.
      console.warn("[lead] could not append to .leads.jsonl:", err);
    }

    return { ok: true, id: lead.id };
  },
};

/* -------------------------------------------------------------------------
   resend — real email. Inactive until the client's address is confirmed.
   ------------------------------------------------------------------------- */
const resendProvider: LeadProvider = {
  name: "resend",
  async submit(lead) {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    if (!key || !to) {
      return { ok: false, error: "RESEND_API_KEY and LEAD_TO_EMAIL must both be set." };
    }

    const rows = Object.entries(lead)
      .filter(([k]) => !["company", "startedAt"].includes(k))
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#8FA0B8">${k}</td><td>${String(v ?? "")}</td></tr>`)
      .join("");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "NAAHAZ Website <onboarding@resend.dev>",
        to: [to],
        subject: `${lead.urgent ? "[URGENT] " : ""}New enquiry — ${lead.name} (${lead.interest})`,
        html: `<h2>New website enquiry</h2><table>${rows}</table>`,
      }),
    });

    if (!res.ok) return { ok: false, error: `Resend responded ${res.status}` };
    return { ok: true, id: lead.id };
  },
};

/* -------------------------------------------------------------------------
   webhook — Zapier / Make / n8n / a CRM endpoint.
   ------------------------------------------------------------------------- */
const webhookProvider: LeadProvider = {
  name: "webhook",
  async submit(lead) {
    const url = process.env.LEAD_WEBHOOK_URL;
    if (!url) return { ok: false, error: "LEAD_WEBHOOK_URL is not set." };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) return { ok: false, error: `Webhook responded ${res.status}` };
    return { ok: true, id: lead.id };
  },
};

const PROVIDERS: Record<string, LeadProvider> = {
  console: consoleProvider,
  resend: resendProvider,
  webhook: webhookProvider,
};

export function getLeadProvider(): LeadProvider {
  const key = (process.env.LEAD_PROVIDER ?? "console").toLowerCase();
  return PROVIDERS[key] ?? consoleProvider;
}

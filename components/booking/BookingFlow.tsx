"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SERVICES_SORTED } from "@/content/services";
import { CONTACT_TIMES } from "@/lib/leads/schema";
import { site } from "@/lib/site";

/**
 * Native appointment request.
 *
 * Deliberately not an embed. If the client supplies a Calendly or Acuity link
 * later, set NEXT_PUBLIC_BOOKING_EMBED_URL and the page swaps to the embed —
 * see app/book/page.tsx. Until then this is a complete, working flow rather
 * than a placeholder rectangle.
 */

const DAY_PARTS = [...CONTACT_TIMES];

function nextWeekdays(count: number) {
  const days: { iso: string; label: string; weekday: string }[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd === 0 || wd === 6) continue; // office is weekdays
    days.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return days;
}

export function BookingFlow({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const startedAt = useRef(Date.now());
  const days = useRef(nextWeekdays(10)).current;

  const [service, setService] = useState("");
  const [day, setDay] = useState("");
  const [part, setPart] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!service) return setErr("Please choose what you'd like to talk about.");
    if (!day) return setErr("Please pick a preferred day.");
    if (phone && !consent) return setErr("Please confirm consent so we can call or text you.");

    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest: service,
          name,
          email,
          phone: phone || undefined,
          bestTime: part || undefined,
          message: [`Appointment request — preferred ${day}${part ? `, ${part.toLowerCase()}` : ""}`, notes]
            .filter(Boolean)
            .join("\n\n"),
          consent,
          company,
          startedAt: startedAt.current,
          source: "booking",
          urgent: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    const chosen = days.find((d) => d.iso === day);
    return (
      <div className="rounded-3xl border border-gold-500/30 bg-navy-800/60 p-10 text-center sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 7" stroke="var(--color-gold-400)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-7 text-h3 font-semibold text-ink-50">Request received</h3>
        <p className="mx-auto mt-4 max-w-md text-ink-300">
          Thanks {name.split(" ")[0]}. We&rsquo;ll confirm{" "}
          {chosen ? `${chosen.weekday} ${chosen.label}` : "your preferred time"}
          {part ? ` ${part.toLowerCase()}` : ""} by email shortly. If you need us
          sooner, call{" "}
          <a
            href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
            className="inline-link text-gold-400 underline underline-offset-4"
          >
            {site.contact.phonePrimary}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`rounded-3xl border border-navy-700 bg-navy-800/60 backdrop-blur-sm ${compact ? "p-7" : "p-8 sm:p-12"}`}
    >
      {/* Service */}
      <fieldset>
        <legend className="text-[0.85rem] font-medium text-ink-300">
          What would you like to talk about?
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {SERVICES_SORTED.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setService(s.slug)}
              className={`min-h-0 rounded-full border px-4 py-2.5 text-[0.88rem] transition-all duration-250 ${
                service === s.slug
                  ? "border-gold-500 bg-gold-500/12 text-ink-50"
                  : "border-navy-600 text-ink-300 hover:border-navy-500"
              }`}
            >
              {s.short}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Day */}
      <fieldset className="mt-9">
        <legend className="text-[0.85rem] font-medium text-ink-300">Preferred day</legend>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {days.map((d) => (
            <button
              key={d.iso}
              type="button"
              onClick={() => setDay(d.iso)}
              className={`min-h-0 rounded-xl border px-2 py-3 text-center transition-all duration-250 ${
                day === d.iso
                  ? "border-gold-500 bg-gold-500/12"
                  : "border-navy-600 hover:border-navy-500"
              }`}
            >
              <span className="block text-[0.72rem] uppercase tracking-wide text-ink-500">{d.weekday}</span>
              <span className={`mt-1 block text-[0.9rem] ${day === d.iso ? "text-ink-50" : "text-ink-300"}`}>
                {d.label}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-[0.8rem] text-ink-500">
          We&rsquo;ll confirm the exact time by email — this just tells us when suits you.
        </p>
      </fieldset>

      {/* Time of day */}
      <fieldset className="mt-9">
        <legend className="text-[0.85rem] font-medium text-ink-300">Time of day</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {DAY_PARTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPart(p)}
              className={`min-h-0 rounded-full border px-5 py-2.5 text-[0.88rem] transition-all duration-250 ${
                part === p
                  ? "border-gold-500 bg-gold-500/12 text-ink-50"
                  : "border-navy-600 text-ink-300 hover:border-navy-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Contact */}
      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <label className="block min-h-0">
          <span className="mb-2.5 block text-[0.85rem] font-medium text-ink-300">
            Your name <span className="text-gold-500">*</span>
          </span>
          <input type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="block min-h-0">
          <span className="mb-2.5 block text-[0.85rem] font-medium text-ink-300">
            Email <span className="text-gold-500">*</span>
          </span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="block min-h-0">
          <span className="mb-2.5 block text-[0.85rem] font-medium text-ink-300">Phone</span>
          <input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </label>
        <label className="block min-h-0">
          <span className="mb-2.5 block text-[0.85rem] font-medium text-ink-300">Anything we should know?</span>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer gap-3.5 rounded-xl border border-navy-600 bg-navy-900/40 p-5">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold-500)]" />
        <span className="text-[0.82rem] leading-relaxed text-ink-500">
          By providing my phone number, I consent to receive calls and text messages
          from {site.name} about my appointment and insurance products, including
          through automated means. Consent is not a condition of purchase.
        </span>
      </label>

      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="booking-company">Company website</label>
        <input id="booking-company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      <AnimatePresence>
        {err && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: reduced ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3.5 text-[0.9rem] text-red-200"
          >
            {err}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={busy}
        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-500 px-8 font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 disabled:opacity-50 sm:w-auto"
      >
        {busy ? "Sending…" : "Request this time"}
        {!busy && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-navy-600 bg-navy-900/60 px-4 text-ink-50 outline-none transition-colors duration-250 focus:border-gold-500/70";

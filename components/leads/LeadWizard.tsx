"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AGE_BANDS, CONTACT_TIMES, TIMELINES } from "@/lib/leads/schema";
import { QUALIFIERS, scoreLead } from "@/content/qualifiers";
import { SERVICES_SORTED } from "@/content/services";
import { site } from "@/lib/site";
import { tone, type Tone } from "@/components/ui/tone";

/**
 * The lead form. One component, three steps, context-aware.
 *
 * Pass `defaultInterest` and it pre-selects the service and asks that
 * service's qualifying questions — which is what makes the same form feel
 * bespoke on every page without maintaining nine copies of it.
 */

type Step = 0 | 1 | 2;

const INTERESTS = [
  ...SERVICES_SORTED.map((s) => ({ value: s.slug, label: s.short })),
  { value: "other", label: "Something else" },
];

export function LeadWizard({
  defaultInterest,
  source = "unknown",
  compact = false,
  surface = "dark",
}: {
  defaultInterest?: string;
  source?: string;
  compact?: boolean;
  surface?: Tone;
}) {
  const t = tone[surface];
  const paper = surface === "paper";
  const reduced = useReducedMotion();
  const startedAt = useRef(Date.now());

  const [step, setStep] = useState<Step>(defaultInterest ? 1 : 0);
  const [interest, setInterest] = useState(defaultInterest ?? "");
  const [qualifiers, setQualifiers] = useState<Record<string, string>>({});
  const [ageBand, setAgeBand] = useState("");
  const [zip, setZip] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const questions = useMemo(() => QUALIFIERS[interest] ?? QUALIFIERS.other, [interest]);

  const canAdvance =
    step === 0 ? Boolean(interest) : step === 1 ? true : Boolean(name && email);

  function next() {
    setError(null);
    if (step === 0 && !interest) return setError("Please choose what brings you here.");
    setStep((s) => Math.min(2, s + 1) as Step);
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(0, s - 1) as Step);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (phone && !consent) {
      return setError("Please confirm consent so we can call or text you.");
    }

    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest,
          ageBand: ageBand || undefined,
          zip: zip || undefined,
          timeline: timeline || undefined,
          context: qualifiers,
          name,
          email,
          phone: phone || undefined,
          bestTime: bestTime || undefined,
          message: message || undefined,
          consent,
          company,
          startedAt: startedAt.current,
          source,
          score: scoreLead({ timeline, interest, qualifiers }),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className={`rounded-3xl border p-10 text-center sm:p-14 ${paper ? "border-gold-600/30 bg-paper-100" : "border-gold-500/30 bg-navy-800/60"}`}>
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${paper ? "bg-gold-500/20" : "bg-gold-500/15"}`}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 7" stroke={paper ? "var(--color-gold-700)" : "var(--color-gold-400)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className={`mt-7 text-h3 font-semibold ${t.text}`}>Thank you, {name.split(" ")[0]}.</h3>
        <p className={`mx-auto mt-4 max-w-md ${t.body}`}>
          We&rsquo;ve got your details and someone will be in touch shortly. If it&rsquo;s
          urgent, call us directly at{" "}
          <a
            href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
            className={`inline-link underline underline-offset-4 ${paper ? "text-slate-700 decoration-gold-600" : "text-gold-400"}`}
          >
            {site.contact.phonePrimary}
          </a>
          .
        </p>
      </div>
    );
  }

  const slide = {
    initial: { opacity: 0, x: reduced ? 0 : 28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduced ? 0 : -28 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <form
      onSubmit={submit}
      className={`rounded-3xl ${t.cardRaised} ${paper ? "" : "backdrop-blur-sm"} ${compact ? "p-7 sm:p-9" : "p-8 sm:p-12"}`}
      noValidate
    >
      {/* Progress */}
      <div className="mb-9 flex items-center gap-4">
        <div className="flex gap-2" role="presentation">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? "w-9 bg-gold-500" : i < step ? "w-4 bg-gold-500/50" : paper ? "w-4 bg-paper-300" : "w-4 bg-navy-600"
              }`}
            />
          ))}
        </div>
        <span className={`text-[0.8rem] ${t.muted}`}>Step {step + 1} of 3</span>
      </div>

      <AnimatePresence mode="wait">
        {/* ---------------------------------------------------- Step 1 */}
        {step === 0 && (
          <motion.fieldset key="s0" {...slide}>
            <legend className={`text-h3 font-semibold ${t.text}`}>What brings you here?</legend>
            <p className={`mt-3 ${t.muted}`}>Pick the closest one — we&rsquo;ll sort out the details together.</p>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {INTERESTS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 transition-all duration-250 ${
                    interest === opt.value
                      ? paper
                        ? "border-gold-600 bg-gold-500/10 text-slate-700"
                        : "border-gold-500 bg-gold-500/10 text-ink-50"
                      : paper
                        ? "border-paper-300 text-slate-700 hover:border-gold-600/40 hover:bg-paper-200"
                        : "border-navy-600 text-ink-300 hover:border-navy-500 hover:bg-navy-700/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="interest"
                    value={opt.value}
                    checked={interest === opt.value}
                    onChange={(e) => setInterest(e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      interest === opt.value ? (paper ? "border-gold-600" : "border-gold-500") : paper ? "border-paper-300" : "border-navy-500"
                    }`}
                    aria-hidden
                  >
                    {interest === opt.value && <span className={`h-2 w-2 rounded-full ${paper ? "bg-gold-600" : "bg-gold-500"}`} />}
                  </span>
                  <span className="text-[0.98rem]">{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.fieldset>
        )}

        {/* ---------------------------------------------------- Step 2 */}
        {step === 1 && (
          <motion.fieldset key="s1" {...slide}>
            <legend className={`text-h3 font-semibold ${t.text}`}>A little about you</legend>
            <p className={`mt-3 ${t.muted}`}>All optional — it just helps us come prepared.</p>

            <div className="mt-7 space-y-6">
              {questions.map((q) => (
                <Field key={q.id} label={q.label} t={t}>
                  <Select t={t} value={qualifiers[q.id] ?? ""}
                    onChange={(v) => setQualifiers((prev) => ({ ...prev, [q.id]: v }))}
                    options={q.options}
                  />
                </Field>
              ))}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Age range" t={t}>
                  <Select t={t} value={ageBand} onChange={setAgeBand} options={[...AGE_BANDS]} />
                </Field>
                <Field label="ZIP code" t={t}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="60008"
                    className={`${INPUT_BASE} ${t.input}`}
                  />
                </Field>
              </div>

              <Field label="What's your timeline?" t={t}>
                <Select t={t} value={timeline} onChange={setTimeline} options={[...TIMELINES]} />
              </Field>
            </div>
          </motion.fieldset>
        )}

        {/* ---------------------------------------------------- Step 3 */}
        {step === 2 && (
          <motion.fieldset key="s2" {...slide}>
            <legend className={`text-h3 font-semibold ${t.text}`}>How should we reach you?</legend>
            <p className={`mt-3 ${t.muted}`}>We&rsquo;ll never sell your details or add you to a list.</p>

            <div className="mt-7 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Your name" required t={t}>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${INPUT_BASE} ${t.input}`}
                  />
                </Field>
                <Field label="Email" required t={t}>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${INPUT_BASE} ${t.input}`}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Phone" t={t}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${INPUT_BASE} ${t.input}`}
                  />
                </Field>
                <Field label="Best time to reach you" t={t}>
                  <Select t={t} value={bestTime} onChange={setBestTime} options={[...CONTACT_TIMES]} />
                </Field>
              </div>

              <Field label="Anything else we should know?" t={t}>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${INPUT_BASE} ${t.input} resize-y py-3`}
                />
              </Field>

              {/*
                TCPA consent. Required whenever a phone number is given.
                TODO(client): wording is a placeholder — needs attorney review.
              */}
              <label className={`flex cursor-pointer gap-3.5 rounded-xl border p-5 ${paper ? "border-paper-300 bg-paper-200" : "border-navy-600 bg-navy-900/40"}`}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold-500)]"
                />
                <span className={`text-[0.85rem] leading-relaxed ${t.muted}`}>
                  By providing my phone number, I consent to receive calls and text
                  messages from {site.name} about insurance products and services,
                  including through automated means. Consent is not a condition of
                  purchase. Message and data rates may apply, and I can opt out at
                  any time.
                </span>
              </label>

              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="company-website">Company website</label>
                <input
                  id="company-website"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      {error && (
        <p role="alert" className={`mt-6 rounded-xl border px-5 py-3.5 text-[0.9rem] ${paper ? "border-red-600/30 bg-red-50 text-red-800" : "border-red-500/40 bg-red-500/10 text-red-200"}`}>
          {error}
        </p>
      )}

      <div className="mt-9 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className={`inline-flex items-center rounded-full border px-7 text-[0.95rem] transition-colors ${paper ? "border-paper-300 text-slate-500 hover:border-gold-600/50 hover:text-slate-700" : "border-navy-600 text-ink-300 hover:border-navy-500 hover:text-ink-50"}`}
          >
            Back
          </button>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-gold-500 px-8 font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            Continue
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={busy || !canAdvance}
            className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-gold-500 px-8 font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            {busy ? "Sending…" : "Send my details"}
          </button>
        )}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ bits */

const INPUT_BASE =
  "w-full rounded-xl border px-4 outline-none transition-colors duration-250";

function Field({
  label,
  required,
  children,
  t,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  t: (typeof tone)[Tone];
}) {
  return (
    <label className="block min-h-0">
      <span className={`mb-2.5 block text-[0.85rem] font-medium ${t.body}`}>
        {label}
        {required && <span className="ml-1 text-gold-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  t: (typeof tone)[Tone];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT_BASE} ${t.input} appearance-none pr-11`}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${t.muted}`}
        aria-hidden
      >
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

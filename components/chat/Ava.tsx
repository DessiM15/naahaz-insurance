"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getChatEngine, type Answer } from "@/lib/chat/engine";
import { SERVICES_SORTED } from "@/content/services";
import { QUALIFIERS, scoreLead } from "@/content/qualifiers";
import { site } from "@/lib/site";

/**
 * Ava — the site assistant.
 *
 * No AI, and no monthly cost. She works from a keyword index built out of the
 * same content that renders the pages, runs a short qualifying flow, and hands
 * off to a human whenever she isn't confident. She never invents an answer,
 * which matters more here than sounding clever.
 *
 * The answering engine sits behind an interface (lib/chat/engine.ts), so an
 * LLM can be dropped in later without touching this file.
 */

type Msg = {
  id: string;
  role: "ava" | "user";
  text: string;
  links?: { label: string; href: string }[];
};

type Mode = "menu" | "chat" | "qualify" | "capture" | "sent";

let msgSeq = 0;
const nextId = () => `m${msgSeq++}`;

const GREETING =
  "Hi, I'm Ava. I help folks here work out what kind of coverage makes sense. What's on your mind?";

export function Ava() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const engineRef = useRef(getChatEngine());
  const logRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("menu");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: nextId(), role: "ava", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  // Qualifying flow state
  const [qService, setQService] = useState<string>("");
  const [qStep, setQStep] = useState(0);
  const [qAnswers, setQAnswers] = useState<Record<string, string>>({});

  // Capture form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const push = useCallback((m: Omit<Msg, "id">) => {
    setMsgs((prev) => [...prev, { ...m, id: nextId() }]);
  }, []);

  /* ---------------------------------------------------------- triggers */
  useEffect(() => {
    if (sessionStorage.getItem("naahaz:ava-dismissed")) return;
    if (sessionStorage.getItem("naahaz:ava-teased")) return;

    const views = Number(sessionStorage.getItem("naahaz:views") ?? "0") + 1;
    sessionStorage.setItem("naahaz:views", String(views));

    const isService = pathname.startsWith("/services/");
    const service = SERVICES_SORTED.find((s) => pathname === `/services/${s.slug}`);

    const fire = () => {
      if (sessionStorage.getItem("naahaz:ava-teased")) return;
      sessionStorage.setItem("naahaz:ava-teased", "1");
      setTeaser(
        service
          ? `Questions about ${service.short}? I can help.`
          : "Not sure where to start? I can point you in the right direction.",
      );
    };

    const timers: number[] = [];

    // 20 seconds on a service page.
    if (isService) timers.push(window.setTimeout(fire, 20_000));
    // Second page view in the session.
    if (views >= 2) timers.push(window.setTimeout(fire, 4_000));

    // Scrolled past halfway.
    const onScroll = () => {
      const pct =
        window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (pct > 0.5) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Exit intent, desktop only.
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mouseleave", onLeave);
    }

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [pathname]);

  // Keep the transcript pinned to the newest message.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, mode, thinking]);

  function dismissTeaser() {
    setTeaser(null);
    sessionStorage.setItem("naahaz:ava-dismissed", "1");
  }

  function openPanel() {
    setTeaser(null);
    setOpen(true);
  }

  /* ------------------------------------------------------------- asking */
  async function ask(question: string) {
    push({ role: "user", text: question });
    setInput("");
    setMode("chat");
    setThinking(true);

    // A short beat so answers don't snap in faster than they can be read.
    const answer: Answer = await engineRef.current.ask(question);
    window.setTimeout(() => {
      push({ role: "ava", text: answer.text, links: answer.links });
      if (answer.uncertain) {
        push({
          role: "ava",
          text: `Or I can have ${site.founders[1].name.split(" ")[0]} answer directly — he's quick.`,
        });
      }
      setThinking(false);
    }, reduced ? 60 : 500);
  }

  /* ---------------------------------------------------------- qualifying */
  function startQualify(slug: string) {
    const svc = SERVICES_SORTED.find((s) => s.slug === slug);
    setQService(slug);
    setQStep(0);
    setQAnswers({});
    setMode("qualify");
    push({ role: "user", text: svc?.short ?? slug });
    push({
      role: "ava",
      text: `Great — ${svc?.short ?? "that"}. Two quick questions and I'll know how best to help.`,
    });
  }

  function answerQualifier(qid: string, value: string) {
    const questions = QUALIFIERS[qService] ?? QUALIFIERS.other;
    const updated = { ...qAnswers, [qid]: value };
    setQAnswers(updated);
    push({ role: "user", text: value });

    if (qStep + 1 < questions.length) {
      setQStep(qStep + 1);
      return;
    }

    const score = scoreLead({ interest: qService, qualifiers: updated });
    const hot = score >= 45;
    setUrgent(hot);
    push({
      role: "ava",
      text: hot
        ? `That's helpful — it sounds like it's worth a proper conversation soon. Want ${site.founders[1].name.split(" ")[0]} to walk you through your options?`
        : "Got it. Want us to follow up with the details, or would you rather keep looking around first?",
    });
    setMode("capture");
  }

  /* ------------------------------------------------------------- capture */
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (phone && !consent) {
      return setErr("Please tick the consent box so we can call or text.");
    }
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest: qService || "other",
          context: qAnswers,
          name,
          email,
          phone: phone || undefined,
          consent,
          source: `ava:${pathname}`,
          urgent,
          score: scoreLead({ interest: qService || "other", qualifiers: qAnswers }),
          startedAt: Date.now() - 10_000,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setMode("sent");
      push({
        role: "ava",
        text: `Thanks ${name.split(" ")[0]} — that's with us. Someone will reach out shortly.`,
      });
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const questions = QUALIFIERS[qService] ?? QUALIFIERS.other;
  const currentQ = questions[qStep];

  return (
    <>
      {/* -------------------------------------------------------- teaser */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-40 max-w-[16rem] rounded-2xl border border-gold-500/30 bg-navy-800 p-4 pr-9 shadow-2xl sm:right-6"
          >
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="absolute right-1.5 top-1.5 inline-flex h-8 w-8 min-h-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:text-ink-50"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={openPanel} className="block min-h-0 text-left text-[0.9rem] text-ink-200">
              {teaser}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------ launcher */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-expanded={open}
        aria-controls="ava-panel"
        aria-label={open ? "Close chat" : "Chat with Ava"}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-[0_8px_32px_-6px_rgba(201,162,39,0.6)] transition-transform duration-300 hover:scale-105 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" width="18" height="18" viewBox="0 0 14 14" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }} aria-hidden>
              <path d="M21 11.5a8.4 8.4 0 01-9 8.4 9 9 0 01-3.9-.8L3 21l1.9-4.6A8.4 8.4 0 013 11.5a8.4 8.4 0 019-8.4 8.4 8.4 0 019 8.4z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* --------------------------------------------------------- panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="ava-panel"
            role="dialog"
            aria-label="Chat with Ava"
            initial={{ opacity: 0, y: reduced ? 0 : 22, scale: reduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(34rem,75vh)] flex-col overflow-hidden rounded-3xl border border-navy-700 bg-navy-900 shadow-2xl sm:inset-x-auto sm:right-6 sm:w-[23rem]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-navy-700 bg-navy-800/70 px-5 py-4">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
              </span>
              <div className="leading-tight">
                <p className="text-[0.95rem] font-semibold text-ink-50">Ava</p>
                <p className="text-[0.72rem] text-ink-500">NAAHAZ assistant</p>
              </div>
            </div>

            {/* Transcript */}
            <div ref={logRef} className="flex-1 space-y-3.5 overflow-y-auto px-5 py-5" aria-live="polite">
              {msgs.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9rem] leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold-500 text-navy-950"
                        : "bg-navy-800 text-ink-200"
                    }`}
                  >
                    {m.text}
                    {m.links && m.links.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.href + l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="inline-link flex items-center gap-2 text-[0.85rem] text-gold-400 underline decoration-gold-500/30 underline-offset-4 hover:decoration-gold-500"
                          >
                            → {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex gap-1.5 px-1" aria-label="Ava is typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-ink-500"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {/* Guided options */}
              {mode === "menu" && !thinking && (
                <div className="space-y-1.5 pt-1">
                  {SERVICES_SORTED.slice(0, 4).map((s) => (
                    <Chip key={s.slug} onClick={() => startQualify(s.slug)}>
                      {s.short}
                    </Chip>
                  ))}
                  <Chip onClick={() => { setOpen(false); window.location.href = "/book"; }}>
                    Book an appointment
                  </Chip>
                  <Chip onClick={() => { setQService("other"); setMode("capture"); setUrgent(true); push({ role: "user", text: "I'd like to speak to someone" }); push({ role: "ava", text: `Of course. Leave your details and we'll call you — or reach us now on ${site.contact.phonePrimary}.` }); }}>
                    Talk to a human
                  </Chip>
                </div>
              )}

              {/* Qualifier */}
              {mode === "qualify" && currentQ && !thinking && (
                <div className="pt-1">
                  <p className="mb-2.5 px-1 text-[0.85rem] text-ink-300">{currentQ.label}</p>
                  <div className="space-y-1.5">
                    {currentQ.options.map((o) => (
                      <Chip key={o} onClick={() => answerQualifier(currentQ.id, o)}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                  <p className="mt-3 px-1 text-[0.72rem] text-ink-500">
                    Question {qStep + 1} of {questions.length}
                  </p>
                </div>
              )}

              {/* Capture */}
              {mode === "capture" && (
                <form onSubmit={submit} className="space-y-2.5 pt-1">
                  <input
                    type="text" required placeholder="Your name" autoComplete="name"
                    value={name} onChange={(e) => setName(e.target.value)} className={chatInput}
                  />
                  <input
                    type="email" required placeholder="Email" autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} className={chatInput}
                  />
                  <input
                    type="tel" placeholder="Phone (optional)" autoComplete="tel"
                    value={phone} onChange={(e) => setPhone(e.target.value)} className={chatInput}
                  />
                  <label className="flex gap-2.5 px-1 pt-1">
                    <input
                      type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-gold-500)]"
                    />
                    <span className="text-[0.7rem] leading-relaxed text-ink-500">
                      I consent to receive calls and texts from {site.name}, including by
                      automated means. Not a condition of purchase.
                    </span>
                  </label>
                  {err && <p role="alert" className="px-1 text-[0.78rem] text-red-300">{err}</p>}
                  <button
                    type="submit" disabled={busy}
                    className="w-full rounded-xl bg-gold-500 py-3 text-[0.9rem] font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
                  >
                    {busy ? "Sending…" : urgent ? "Have someone call me" : "Send my details"}
                  </button>
                </form>
              )}
            </div>

            {/* Input */}
            {mode !== "capture" && mode !== "sent" && (
              <form
                onSubmit={(e) => { e.preventDefault(); if (input.trim()) ask(input.trim()); }}
                className="flex items-center gap-2 border-t border-navy-700 bg-navy-800/50 px-4 py-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="…or just ask me anything"
                  aria-label="Ask Ava a question"
                  className="min-h-0 flex-1 bg-transparent py-2 text-[0.9rem] text-ink-50 outline-none placeholder:text-ink-500"
                />
                <button
                  type="submit" disabled={!input.trim()} aria-label="Send"
                  className="inline-flex h-9 w-9 min-h-0 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-opacity disabled:opacity-30"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const chatInput =
  "w-full min-h-0 rounded-xl border border-navy-600 bg-navy-900 px-3.5 py-2.5 text-[0.88rem] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-gold-500/70";

function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-0 rounded-xl border border-navy-600 bg-navy-800/60 px-4 py-2.5 text-left text-[0.88rem] text-ink-200 transition-all duration-250 hover:border-gold-500/50 hover:bg-navy-700"
    >
      {children}
    </button>
  );
}

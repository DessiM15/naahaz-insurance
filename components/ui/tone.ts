/**
 * Surface tone.
 *
 * The site alternates between navy brand surfaces and warm paper reading
 * surfaces. Rather than duplicate components, each one that carries colour
 * takes a `tone` and looks its classes up here — so the contrast decisions
 * live in one file instead of being scattered through JSX.
 *
 * The important rule, measured rather than guessed: gold is a voice on navy
 * and a material on paper. It fails AA as small text on paper at 3.11:1, so
 * eyebrows and links become slate and navy there, while gold survives as
 * button fills, rules, and large headline accents.
 */
export type Tone = "dark" | "paper";

export const tone = {
  dark: {
    section: "",
    text: "text-ink-50",
    body: "text-ink-300",
    muted: "text-ink-500",
    lead: "text-ink-300",
    /** Small label text — gold is safe here (10.9:1). */
    eyebrow: "text-gold-400",
    accent: "accent-word",
    rule: "rule-hairline",
    border: "border-navy-700",
    borderHover: "hover:border-gold-500/50",
    card: "border border-navy-700 bg-navy-800/50",
    cardRaised: "border border-navy-700 bg-navy-800/60",
    divide: "divide-navy-700 border-navy-700",
    link: "text-gold-400 decoration-gold-500/40 hover:decoration-gold-500",
    input:
      "border-navy-600 bg-navy-900/60 text-ink-50 placeholder:text-ink-500/60 focus:border-gold-500/70",
    tick: "var(--color-gold-500)",
  },
  paper: {
    section: "surface-paper",
    text: "text-slate-700",
    body: "text-slate-700/85",
    /** 4.95:1 — the floor for muted text on paper. */
    muted: "text-slate-500",
    lead: "text-slate-700/90",
    /** Gold fails as small text on paper; the gold dash beside it stays gold. */
    eyebrow: "text-slate-500",
    accent: "accent-word-paper",
    rule: "rule-paper",
    border: "border-paper-300",
    borderHover: "hover:border-gold-600/50",
    card: "border border-paper-300 bg-paper-100",
    cardRaised: "border border-paper-300 bg-paper-100 shadow-[0_1px_3px_rgba(10,22,40,0.06)]",
    divide: "divide-paper-300 border-paper-300",
    link: "text-slate-700 decoration-gold-600/50 hover:decoration-gold-600",
    input:
      "border-paper-300 bg-paper-100 text-slate-700 placeholder:text-slate-500/60 focus:border-gold-600/70",
    tick: "var(--color-gold-600)",
  },
} as const satisfies Record<Tone, Record<string, string>>;

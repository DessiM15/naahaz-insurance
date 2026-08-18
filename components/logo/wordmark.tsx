import type { SVGProps } from "react";

/**
 * The NAAHAZ wordmark, and its variants.
 *
 * Letterforms are monoline geometric strokes built from a shared grid, so
 * every variant is the same drawing with a different accent decision. That
 * matters: you're comparing the idea, not six differently-drawn wordmarks.
 *
 * Note on the H — an earlier version used a single gold rule running the full
 * width of the name, which doubled as the H's crossbar. Removing that rule
 * meant the H needed its own bar back, or it reads as two loose verticals.
 */

const ADV = 38;   // advance between letters
const X0 = 4;     // left padding
const W = 28;     // letter width
const TOP = 4;
const BOT = 44;
/**
 * Shared crossbar height for A and H.
 *
 * These were originally at different heights — typographically defensible,
 * but the moment the bars are set in gold the eye reads the mismatch as a
 * mistake. Aligning them is what makes the Gold Bars variant work.
 */
const BAR = 26;

const x = (i: number) => i * ADV + X0;

/* --- letterforms ---------------------------------------------------------- */
const N = (i: number) => `M${x(i)} ${BOT} V${TOP} M${x(i)} ${TOP} L${x(i) + W} ${BOT} M${x(i) + W} ${BOT} V${TOP}`;
const A = (i: number) => `M${x(i)} ${BOT} L${x(i) + 14} ${TOP} L${x(i) + W} ${BOT}`;
const Abar = (i: number) => `M${x(i) + 7} ${BAR} H${x(i) + 21}`;
const Hstems = (i: number) => `M${x(i)} ${BOT} V${TOP} M${x(i) + W} ${BOT} V${TOP}`;
const Hbar = (i: number) => `M${x(i)} ${BAR} H${x(i) + W}`;
const Z = (i: number) => `M${x(i)} ${TOP} H${x(i) + W} L${x(i)} ${BOT} H${x(i) + W}`;

export type Stroke = { d: string; gold?: boolean; width?: number };

/** N A A H A Z, undecorated. Index order matches the letters. */
function letters(): Stroke[] {
  return [
    { d: N(0) },
    { d: A(1) }, { d: Abar(1) },
    { d: A(2) }, { d: Abar(2) },
    { d: Hstems(3) }, { d: Hbar(3) },
    { d: A(4) }, { d: Abar(4) },
    { d: Z(5) },
  ];
}

/** Marks the strokes belonging to the given letter indices as gold. */
function goldLetters(indices: number[]): Stroke[] {
  const owner = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5];
  return letters().map((s, i) => ({ ...s, gold: indices.includes(owner[i]) }));
}

export type WordmarkVariantId =
  | "wordmark-clean"
  | "wordmark-bars"
  | "wordmark-underline"
  | "wordmark-initial"
  | "wordmark-shield"
  | "wordmark-split";

export const WORDMARK_GEOMETRY: Record<
  WordmarkVariantId,
  { viewBox: string; strokes: Stroke[] }
> = {
  /** Nothing but the letterforms. The quietest and most confident option. */
  "wordmark-clean": {
    viewBox: "0 0 226 48",
    strokes: letters(),
  },

  /** Every horizontal bar in gold — the accent becomes a rhythm, not a line. */
  "wordmark-bars": {
    viewBox: "0 0 226 48",
    strokes: letters().map((s, i) => ({ ...s, gold: [2, 4, 6, 8].includes(i) })),
  },

  /** A gold rule beneath the name — a foundation rather than a strike-through. */
  "wordmark-underline": {
    viewBox: "0 0 226 60",
    strokes: [...letters(), { d: `M${X0} 54 H${x(5) + W}`, gold: true, width: 3 }],
  },

  /** The N alone in gold. Simplest possible accent, strongest at small sizes. */
  "wordmark-initial": {
    viewBox: "0 0 226 48",
    strokes: goldLetters([0]),
  },

  /**
   * The third letter's crossbar becomes a shallow gold chevron — a piece of
   * shelter inside the name. Replacing the bar rather than adding a mark
   * inside the counter, which was too small to read as anything but a speck.
   */
  "wordmark-shield": {
    viewBox: "0 0 226 48",
    strokes: [
      ...letters().filter((_, i) => i !== 4),
      { d: `M${x(2) + 6} ${BAR + 3} L${x(2) + 14} ${BAR - 3} L${x(2) + 22} ${BAR + 3}`, gold: true },
    ],
  },

  /** NA and AZ in gold — Naureen and Aziz, sitting inside the name itself. */
  "wordmark-split": {
    viewBox: "0 0 226 48",
    strokes: goldLetters([0, 1, 4, 5]),
  },
};

export type WordmarkProps = SVGProps<SVGSVGElement> & {
  variant: WordmarkVariantId;
  stroke?: string;
  accent?: string;
};

export function Wordmark({
  variant,
  stroke = "currentColor",
  accent = "var(--color-gold-500)",
  ...props
}: WordmarkProps) {
  const { viewBox, strokes } = WORDMARK_GEOMETRY[variant];

  return (
    <svg viewBox={viewBox} role="img" aria-hidden {...props}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke={s.gold ? accent : stroke}
            strokeWidth={s.width ?? 4}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Compact companion for each wordmark — favicon, app icon, tight mobile nav.
 * A wordmark alone cannot survive 16px, so every variant needs one of these.
 */
export function WordmarkCompact({
  variant,
  stroke = "currentColor",
  accent = "var(--color-gold-500)",
  ...props
}: WordmarkProps) {
  // The N, plus whatever accent that variant is built around.
  const accents: Record<WordmarkVariantId, Stroke[]> = {
    "wordmark-clean": [],
    "wordmark-bars": [{ d: "M12 30 H44", gold: true }],
    "wordmark-underline": [{ d: "M10 54 H46", gold: true, width: 3 }],
    "wordmark-initial": [],
    "wordmark-shield": [{ d: "M18 33 L28 25 L38 33", gold: true }],
    "wordmark-split": [],
  };

  const nGold = variant === "wordmark-initial" || variant === "wordmark-split";

  return (
    <svg viewBox="0 0 64 60" role="img" aria-hidden {...props}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
        <path d="M12 48 V12 M12 12 L44 48 M44 48 V12" stroke={nGold ? accent : stroke} />
        {accents[variant].map((s, i) => (
          <path key={i} d={s.d} stroke={accent} strokeWidth={s.width ?? 4} />
        ))}
      </g>
    </svg>
  );
}

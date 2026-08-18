import type { SVGProps } from "react";
import type { LogoConceptId } from "@/lib/brand";

/**
 * All four marks are built as *strokes*, not fills.
 *
 * That is deliberate: the loading screen animates each mark on with a
 * stroke-dashoffset path draw, which only works on stroked geometry. It also
 * keeps every concept visually consistent (monoline, 4px at a 64px box) so
 * they can be compared on their form rather than their weight.
 */

export type MarkProps = SVGProps<SVGSVGElement> & {
  /** Colour of the primary strokes. Defaults to currentColor. */
  stroke?: string;
  /** Colour of the gold accent strokes. */
  accent?: string;
};

const base = {
  fill: "none",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

/* -------------------------------------------------------------------------
   1 — The Shield
   Two angular planes forming a shield, with a doubled chevron inside.
   ------------------------------------------------------------------------- */
export function ShieldMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 64 68" role="img" aria-hidden {...props}>
      <g {...base}>
        <path
          d="M32 3 L60 13.5 V35 C60 50 47.5 60 32 65 C16.5 60 4 50 4 35 V13.5 Z"
          stroke={stroke}
        />
        <path d="M19 30 L32 39 L45 30" stroke={accent} />
        <path d="M19 41 L32 50 L45 41" stroke={accent} opacity={0.55} />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   2 — The N/A Monogram
   The A's apex lands on the N's right stem: two letters, one shared form.
   ------------------------------------------------------------------------- */
export function MonogramMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 68 60" role="img" aria-hidden {...props}>
      <g {...base}>
        {/* N */}
        <path d="M6 54 V6" stroke={stroke} />
        <path d="M6 6 L34 54" stroke={stroke} />
        <path d="M34 54 V6" stroke={stroke} />
        {/* A — right leg descends from the shared apex */}
        <path d="M34 6 L62 54" stroke={stroke} />
        {/* A crossbar, in gold */}
        <path d="M34 38 H52" stroke={accent} />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   3 — The Wordmark
   Monoline geometric letterforms. The H's crossbar breaks out of the letter
   and runs the full width of the name as a gold rule.
   ------------------------------------------------------------------------- */
export function WordmarkMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  // Letter box 28 wide, 40 tall, advancing every 38 units.
  const x = (i: number) => i * 38 + 4;
  const N = (i: number) => `M${x(i)} 44 V4 M${x(i)} 4 L${x(i) + 28} 44 M${x(i) + 28} 44 V4`;
  const A = (i: number) => `M${x(i)} 44 L${x(i) + 14} 4 L${x(i) + 28} 44`;
  const Abar = (i: number) => `M${x(i) + 7} 29 H${x(i) + 21}`;
  const Hstems = (i: number) => `M${x(i)} 44 V4 M${x(i) + 28} 44 V4`;
  const Z = (i: number) => `M${x(i)} 4 H${x(i) + 28} L${x(i)} 44 H${x(i) + 28}`;

  return (
    <svg viewBox="0 0 236 52" role="img" aria-hidden {...props}>
      <g {...base}>
        <path d={N(0)} stroke={stroke} />
        <path d={A(1)} stroke={stroke} />
        <path d={Abar(1)} stroke={stroke} />
        <path d={A(2)} stroke={stroke} />
        <path d={Abar(2)} stroke={stroke} />
        <path d={Hstems(3)} stroke={stroke} />
        <path d={A(4)} stroke={stroke} />
        <path d={Abar(4)} stroke={stroke} />
        <path d={Z(5)} stroke={stroke} />
        {/* The detail: the H crossbar, extended edge to edge in gold. */}
        <path d="M4 24 H232" stroke={accent} strokeWidth={3} />
      </g>
    </svg>
  );
}

/** Compact mark for the wordmark concept — favicon and tight mobile nav. */
export function WordmarkCompactMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 64 60" role="img" aria-hidden {...props}>
      <g {...base}>
        <path d="M8 48 V12 M8 12 L34 48 M34 48 V12" stroke={stroke} />
        <path d="M4 30 H60" stroke={accent} strokeWidth={3} />
        <path d="M42 48 L56 12" stroke={stroke} opacity={0.35} />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   4 — The Ascent
   A doubled chevron. Shelter from above, and upward motion — protection and
   growth in a single form.
   ------------------------------------------------------------------------- */
export function AscendMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 64 60" role="img" aria-hidden {...props}>
      <g {...base}>
        <path d="M4 52 L32 8 L60 52" stroke={stroke} />
        <path d="M17 52 L32 29 L47 52" stroke={accent} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

export const MARKS: Record<LogoConceptId, (p: MarkProps) => React.ReactElement> = {
  shield: ShieldMark,
  monogram: MonogramMark,
  wordmark: WordmarkCompactMark,
  ascend: AscendMark,
};

/** Full-width form of a concept — the wordmark concept differs from its mark. */
export const FULL_MARKS: Record<LogoConceptId, (p: MarkProps) => React.ReactElement> = {
  shield: ShieldMark,
  monogram: MonogramMark,
  wordmark: WordmarkMark,
  ascend: AscendMark,
};

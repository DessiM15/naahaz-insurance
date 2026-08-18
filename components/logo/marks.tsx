import type { SVGProps } from "react";
import type { MarkId } from "@/lib/brand";

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
   3 — The Ascent
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


/* -------------------------------------------------------------------------
   4 — The Keystone
   An arch with its keystone set in gold. The oldest structural idea there is
   for something built to hold weight and stay standing.
   ------------------------------------------------------------------------- */
export function KeystoneMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 64 60" role="img" aria-hidden {...props}>
      <g {...base}>
        <path d="M7 55 V29 A25 25 0 0 1 57 29 V55" stroke={stroke} />
        <path d="M25 8.5 L39 8.5 L42 20 L22 20 Z" stroke={accent} />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   5 — One Line
   N and A drawn as a single unbroken stroke — up, down, up, down. One
   continuous line for two names. It also animates better than anything else
   here, since the whole mark is one path.
   ------------------------------------------------------------------------- */
export function OneLineMark({ stroke = "currentColor", accent = "#C9A227", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 70 60" role="img" aria-hidden {...props}>
      <g {...base}>
        <path d="M6 54 V6 L36 54 V6 L64 54" stroke={stroke} />
        <path d="M36 40 H56" stroke={accent} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

export const MARKS: Record<MarkId, (p: MarkProps) => React.ReactElement> = {
  shield: ShieldMark,
  monogram: MonogramMark,
  ascend: AscendMark,
  keystone: KeystoneMark,
  oneline: OneLineMark,
};

/**
 * The same marks as path data, so the loading screen can animate each stroke
 * on. Kept immediately beside the components above so the two cannot drift.
 */
export const MARK_GEOMETRY: Record<
  MarkId,
  { viewBox: string; strokes: { d: string; gold?: boolean; width?: number }[] }
> = {
  monogram: {
    viewBox: "0 0 68 60",
    strokes: [
      { d: "M6 54 V6" },
      { d: "M6 6 L34 54" },
      { d: "M34 54 V6" },
      { d: "M34 6 L62 54" },
      { d: "M34 38 H52", gold: true },
    ],
  },
  oneline: {
    viewBox: "0 0 70 60",
    strokes: [
      { d: "M6 54 V6 L36 54 V6 L64 54" },
      { d: "M36 40 H56", gold: true },
    ],
  },
  keystone: {
    viewBox: "0 0 64 60",
    strokes: [
      { d: "M7 55 V29 A25 25 0 0 1 57 29 V55" },
      { d: "M25 8.5 L39 8.5 L42 20 L22 20 Z", gold: true },
    ],
  },
  ascend: {
    viewBox: "0 0 64 60",
    strokes: [
      { d: "M4 52 L32 8 L60 52" },
      { d: "M17 52 L32 29 L47 52", gold: true },
    ],
  },
  shield: {
    viewBox: "0 0 64 68",
    strokes: [
      { d: "M32 3 L60 13.5 V35 C60 50 47.5 60 32 65 C16.5 60 4 50 4 35 V13.5 Z" },
      { d: "M19 30 L32 39 L45 30", gold: true },
      { d: "M19 41 L32 50 L45 41", gold: true },
    ],
  },
};

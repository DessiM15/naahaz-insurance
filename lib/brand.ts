/**
 * Brand tokens mirrored from app/globals.css.
 *
 * The CSS is authoritative for anything rendered; this file exists so that
 * SVG generation, OG images, and the brand kit export read the same values.
 */
export const palette = {
  navy950: "#060E1B",
  navy900: "#0A1628",
  navy800: "#101F35",
  navy700: "#172B45",
  navy600: "#223A5A",
  ink50: "#F4F6FA",
  ink300: "#B9C5D6",
  ink500: "#8FA0B8",
  gold600: "#A8871F",
  gold500: "#C9A227",
  gold400: "#E3C766",
  gold200: "#F2E3B0",
} as const;

/** The four logo directions under review. */
export const LOGO_CONCEPTS = [
  {
    id: "shield",
    name: "The Shield",
    rationale:
      "Leans straight into “Protecting What Matters.” A shield built from two angular planes rather than a heraldic crest — reads as modern protection, not a police badge. The clearest, most literal read of the business.",
    strengths: ["Instantly legible at favicon size", "Universal insurance signal", "Strongest at very small sizes"],
    tradeoff: "The most conventional of the four — several agencies in the market use a shield.",
  },
  {
    id: "monogram",
    name: "The N/A Monogram",
    rationale:
      "N and A interlocked, sharing a single stem — Naureen and Aziz in one form. The most ownable mark of the set, and it carries the founding story in its geometry.",
    strengths: ["Unique to this business", "Carries the origin story", "Ages well, no trend markers"],
    tradeoff: "Abstract — it needs the wordmark beside it before people connect it to insurance.",
  },
  {
    id: "wordmark",
    name: "The Wordmark",
    rationale:
      "Monoline geometric letterforms with one detail: the crossbar of the H extends into a gold rule running the width of the name — a line of protection drawn straight through the brand.",
    strengths: ["Most premium-financial", "No mark/name disconnect", "Distinctive without being clever"],
    tradeoff: "Needs the compact mark variant for favicons and tight mobile nav.",
  },
  {
    id: "ascend",
    name: "The Ascent",
    rationale:
      "A double chevron that reads two ways at once: shelter from above, and upward motion. Protection and growth in one form — which is exactly the split between his insurance and his retirement business.",
    strengths: ["Dual meaning fits both halves of his business", "Excellent at small sizes", "Animates beautifully"],
    tradeoff: "Chevrons are common in finance — the doubled form is what keeps it distinct.",
  },
] as const;

export type LogoConceptId = (typeof LOGO_CONCEPTS)[number]["id"];

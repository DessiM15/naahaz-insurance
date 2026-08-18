/**
 * Brand tokens mirrored from app/globals.css.
 *
 * The CSS is authoritative for anything rendered; this file exists so SVG
 * generation, OG images and the brand kit export read the same values.
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

/* -------------------------------------------------------------------------
   Wordmark variants — the direction the client picked in round one.
   Same letterforms throughout; only the accent decision changes.
   ------------------------------------------------------------------------- */
export const WORDMARK_CONCEPTS = [
  {
    id: "wordmark-clean",
    name: "Clean",
    rationale:
      "Nothing but the letterforms. No accent, no device, no trick. The most confident option on the page and the one least likely to look dated in five years — gold lives everywhere else in the brand, so the logo doesn't have to carry it.",
    note: "Reference points: Hermès, Prada, most private banks.",
  },
  {
    id: "wordmark-bars",
    name: "Gold Bars",
    rationale:
      "Every horizontal crossbar — three A's and the H — set in gold. The accent becomes a rhythm running through the name rather than a line drawn across it. Ownable, and it reads as deliberate at a glance.",
    note: "The closest thing here to the original idea, done in a way that doesn't strike the word through.",
  },
  {
    id: "wordmark-underline",
    name: "Foundation",
    rationale:
      "The same gold rule, moved below the baseline. Underneath the name it reads as a footing holding the word up; through the name it read as a cancellation. Identical ink, completely different meaning.",
    note: "Doubles nicely as a divider element across the site.",
  },
  {
    id: "wordmark-initial",
    name: "Gold Initial",
    rationale:
      "The N alone in gold. The simplest possible accent, and the one that survives smallest — at favicon size the N is all you get anyway, so building the identity around it is honest about how the mark will actually be used.",
    note: "Strongest small-size performance of the six.",
  },
  {
    id: "wordmark-shield",
    name: "Sheltered A",
    rationale:
      "A small gold chevron tucked inside the counter of the third letter. You don't notice it at a distance, then you do — a piece of shelter hidden inside the name. Ties the wordmark to “Protecting What Matters” without adding a separate symbol.",
    note: "The most detailed option; needs care below about 24px.",
  },
  {
    id: "wordmark-split",
    name: "Two Names",
    rationale:
      "NA and AZ in gold, AH left in ink — Naureen and Aziz sitting inside the name that was built from them. The origin story becomes the mark itself rather than something explained on the About page.",
    note: "Depends entirely on the NAAHAZ = Naureen + Aziz story being true.",
  },
] as const;

export type WordmarkConceptId = (typeof WORDMARK_CONCEPTS)[number]["id"];

/* -------------------------------------------------------------------------
   Symbol marks — companions to the wordmark, or standalone alternatives.
   ------------------------------------------------------------------------- */
export const MARK_CONCEPTS = [
  {
    id: "monogram",
    name: "The N/A Monogram",
    rationale:
      "N and A interlocked, sharing a single stem. Carries the founding story in its geometry and is the most ownable of the symbols.",
    note: "Abstract — wants the wordmark beside it.",
  },
  {
    id: "oneline",
    name: "One Line",
    rationale:
      "N and A drawn as a single unbroken stroke: up, down, up, down. One continuous line for two names. It also animates better than anything else here, because the entire mark is one path — the loading screen draws it in a single gesture.",
    note: "New this round. Best animation of the set.",
  },
  {
    id: "keystone",
    name: "The Keystone",
    rationale:
      "An arch with its keystone set in gold. The oldest structural metaphor there is for something built to bear weight and stay standing — and unlike a shield, almost nobody in insurance is using it.",
    note: "New this round. Distinctive without being abstract.",
  },
  {
    id: "ascend",
    name: "The Ascent",
    rationale:
      "A doubled chevron reading two ways at once: shelter from above, and upward motion. Protection and growth in one form.",
    note: "Chevrons are common in finance; the doubling is what keeps it distinct.",
  },
  {
    id: "shield",
    name: "The Shield",
    rationale:
      "The literal read. Modern protection rather than a heraldic crest, and the strongest performer at very small sizes.",
    note: "The most conventional option — several competitors use a shield.",
  },
] as const;

export type MarkId = (typeof MARK_CONCEPTS)[number]["id"];

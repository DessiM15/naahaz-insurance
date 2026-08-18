# NAAHAZ INSURANCE — Brand Guide

**Selected logo: the Gold Bars wordmark.**

---

## The mark

Monoline geometric letterforms spelling NAAHAZ, with every horizontal crossbar
— the three A's and the H — set in gold.

The accent runs *through* the name as a rhythm rather than *across* it as a
line. An earlier version used a single rule spanning the full width; it read as
a strike-through, partly because that rule was also doing duty as the H's
crossbar, so the eye saw a struck-out word and an incomplete letter at once.
The letterforms now carry their own bars and the gold sits inside them.

**All four gold bars share one height.** This is not a detail to lose in a
redraw — in white ink a mismatch is invisible, but in gold it reads immediately
as a mistake, and it is the single thing holding this variant together.

### Files

| Use | File |
|---|---|
| Dark backgrounds | `public/brand/naahaz-wordmark-on-navy.svg` |
| Light backgrounds | `public/brand/naahaz-wordmark-on-light.svg` |
| Single colour, gold | `public/brand/naahaz-wordmark-gold.svg` |
| Single colour, white | `public/brand/naahaz-wordmark-white.svg` |
| Single colour, navy | `public/brand/naahaz-wordmark-navy.svg` |
| Compact mark (same five schemes) | `public/brand/naahaz-mark-*.svg` |
| App icon | `public/brand/naahaz-app-icon.svg` · `naahaz-app-icon-512.png` |
| Social card | generated live at `/opengraph-image` |

Regenerate everything with:

```bash
npx tsx --tsconfig tsconfig.json scripts/build-brand.mts
```

### The compact mark

A wordmark cannot survive 16px, so the identity ships with a companion: the N
alone, crossed by a single gold bar at the same height as the wordmark's. Use
it for favicons, app icons, social avatars, and anywhere the full name would
render below roughly 90px wide.

### Clear space and minimum size

Leave clear space equal to the cap height of the N on all sides. Minimum
legible width for the full wordmark is **90px**; below that, use the compact
mark.

### Don't

- Don't reintroduce a rule spanning the full width of the name
- Don't change the bar height on one letter but not the others
- Don't set the bars in any colour other than gold, or the letters in gold
  while the bars stay light
- Don't outline, emboss, add a drop shadow, or place the wordmark over busy
  photography without a scrim
- Don't stretch — the letterforms are drawn to a fixed grid

---

## Colour

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#060E1B` | Deepest ground, loading screen |
| `navy-900` | `#0A1628` | Page background |
| `navy-800` | `#101F35` | Raised surfaces, cards |
| `navy-700` | `#172B45` | Hairlines, borders |
| `navy-600` | `#223A5A` | Hover borders |
| `ink-50` | `#F4F6FA` | Primary text |
| `ink-300` | `#B9C5D6` | Secondary text |
| `ink-500` | `#8FA0B8` | Muted text |
| `gold-500` | `#C9A227` | Accent, buttons, the logo bars |
| `gold-400` | `#E3C766` | Hover, small text on dark |
| `gold-600` | `#A8871F` | Gold on light backgrounds only |

**Contrast note.** `gold-500` on `navy-900` passes AA for large text and UI, not
for body copy. Use `gold-400` for small text on dark, and `gold-600` for gold on
white. Tokens are defined once in `app/globals.css`; nothing hardcodes a hex.

---

## Type

**Geist** throughout — a modern grotesk that sits comfortably beside geometric
letterforms. **Instrument Serif italic** appears only as the gold accent word
inside a headline, never as body copy.

| Role | Size |
|---|---|
| Display | `clamp(2.75rem, 7.5vw, 7rem)`, tracking `-0.035em` |
| H1 | `clamp(2.25rem, 5.5vw, 4.5rem)` |
| H2 | `clamp(1.875rem, 3.6vw, 3rem)` |
| Lead | `clamp(1.125rem, 1.5vw, 1.375rem)` |
| Body | `17px` — an accessible floor, never smaller |
| Eyebrow | `13px`, uppercase, tracking `0.18em` |

Body type never drops below 17px. A large share of this audience is over 60,
and that floor is the difference between a site being read and being squinted
at.

---

## Voice

Plain-spoken, specific, and willing to say the unhelpful thing. Name the
trade-off rather than only the benefit. Never claim a number we don't have.

- "We'll tell you honestly whether we can help — and if we're not the right
  fit, we'll say so."
- Not: "Best-in-class coverage solutions for your family's peace of mind."

The tagline is **Protecting What Matters**. It's the client's own line and it
stays as written.

---

## Changing the logo

The live identity is one object:

```ts
// components/logo/active.ts
export const ACTIVE_LOGO: ActiveLogo = { kind: "wordmark", id: "wordmark-bars" };
```

Change it and the header, footer, loading screen, favicon and social card all
follow. Every variant considered is still in the codebase and rendered at
`/logo-concepts` (excluded from search indexing).

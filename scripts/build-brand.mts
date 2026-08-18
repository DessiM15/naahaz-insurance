/**
 * Brand asset export.
 *
 * Emits the chosen logo as standalone SVGs for print, email signatures, social
 * avatars and anyone else who asks for "the logo". Run with:
 *
 *   npx tsx --tsconfig tsconfig.json scripts/build-brand.mts
 *
 * PNG rasterisation is done separately — see BRAND.md.
 */
import { WORDMARK_GEOMETRY } from "@/components/logo/wordmark";
import { ACTIVE_LOGO } from "@/components/logo/active";
import { palette } from "@/lib/brand";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = "public/brand";
mkdirSync(OUT, { recursive: true });

if (ACTIVE_LOGO.kind !== "wordmark") throw new Error("Expected a wordmark identity.");
const geo = WORDMARK_GEOMETRY[ACTIVE_LOGO.id];

type Scheme = { name: string; ink: string; gold: string; bg?: string };

const SCHEMES: Scheme[] = [
  { name: "on-navy", ink: palette.ink50, gold: palette.gold500, bg: palette.navy900 },
  { name: "on-light", ink: palette.navy900, gold: palette.gold600, bg: palette.ink50 },
  { name: "gold", ink: palette.gold500, gold: palette.gold500 },
  { name: "white", ink: "#FFFFFF", gold: "#FFFFFF" },
  { name: "navy", ink: palette.navy900, gold: palette.navy900 },
];

function paths(strokes: typeof geo.strokes, ink: string, gold: string) {
  return strokes
    .map(
      (s) =>
        `<path d="${s.d}" fill="none" stroke="${s.gold ? gold : ink}" stroke-width="${s.width ?? 4}" stroke-linecap="round" stroke-linejoin="round"/>`,
    )
    .join("\n    ");
}

function wrap(viewBox: string, body: string, bg?: string) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const rect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>\n    ` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">\n    ${rect}${body}\n</svg>\n`;
}

// --- full wordmark, every scheme -------------------------------------------
for (const s of SCHEMES) {
  writeFileSync(
    `${OUT}/naahaz-wordmark-${s.name}.svg`,
    wrap(geo.viewBox, paths(geo.strokes, s.ink, s.gold), s.bg),
  );
}

// --- compact mark, for favicons and avatars --------------------------------
const COMPACT_VB = "0 0 64 60";
const compactStrokes = [
  { d: "M12 48 V12 M12 12 L44 48 M44 48 V12" },
  { d: "M12 30 H44", gold: true },
];
for (const s of SCHEMES) {
  writeFileSync(
    `${OUT}/naahaz-mark-${s.name}.svg`,
    wrap(COMPACT_VB, paths(compactStrokes, s.ink, s.gold), s.bg),
  );
}

// --- app icon: navy rounded square, safe padding ---------------------------
writeFileSync(
  `${OUT}/naahaz-app-icon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="112" fill="${palette.navy900}"/>
    <g transform="translate(128 136) scale(4)" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 48 V12 M4 12 L36 48 M36 48 V12" stroke="${palette.ink50}"/>
      <path d="M4 30 H36" stroke="${palette.gold500}"/>
    </g>
</svg>\n`,
);

// --- OG / social card, 1200x630 --------------------------------------------
const scale = 3.1;
const wmW = 226 * scale;
writeFileSync(
  `${OUT}/naahaz-og.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <rect width="1200" height="630" fill="${palette.navy900}"/>
    <rect y="626" width="1200" height="4" fill="${palette.gold500}"/>
    <g transform="translate(${(1200 - wmW) / 2} 250) scale(${scale})" fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${paths(geo.strokes, palette.ink50, palette.gold500)}
    </g>
    <text x="600" y="410" text-anchor="middle" fill="${palette.ink500}"
      font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" letter-spacing="10">PROTECTING WHAT MATTERS</text>
    <text x="600" y="470" text-anchor="middle" fill="${palette.gold500}"
      font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" letter-spacing="4">ROLLING MEADOWS, ILLINOIS</text>
</svg>\n`,
);

console.log(`brand assets written to ${OUT}/ (${SCHEMES.length * 2 + 2} files)`);

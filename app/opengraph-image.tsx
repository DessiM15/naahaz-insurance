import { ImageResponse } from "next/og";
import { WORDMARK_GEOMETRY } from "@/components/logo/wordmark";
import { ACTIVE_LOGO } from "@/components/logo/active";
import { palette } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card.
 *
 * Rendered by next/og rather than exported as a flat PNG, so it always
 * reflects the live logo — swap ACTIVE_LOGO and the card follows. The
 * wordmark is drawn from the same path data the site uses, so there is no
 * second copy to keep in sync.
 */
export default function OpengraphImage() {
  const geo =
    ACTIVE_LOGO.kind === "wordmark" ? WORDMARK_GEOMETRY[ACTIVE_LOGO.id] : null;
  const [, , vbW, vbH] = (geo?.viewBox ?? "0 0 226 48").split(" ").map(Number);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: palette.navy900,
          position: "relative",
        }}
      >
        {geo && (
          <svg width={vbW * 3} height={vbH * 3} viewBox={geo.viewBox}>
            {geo.strokes.map((s, i) => (
              <path
                key={i}
                d={s.d}
                fill="none"
                stroke={s.gold ? palette.gold500 : palette.ink50}
                strokeWidth={s.width ?? 4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        )}

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 30,
            letterSpacing: 12,
            color: palette.ink300,
          }}
        >
          {site.tagline.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 21,
            letterSpacing: 5,
            color: palette.gold500,
          }}
        >
          ROLLING MEADOWS, ILLINOIS
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: palette.gold500,
          }}
        />
      </div>
    ),
    { ...size },
  );
}

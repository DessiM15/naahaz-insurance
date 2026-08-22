import type { ReactNode } from "react";
import { CurtainScroll } from "./CurtainScroll";

/**
 * The Curtain concept's opener.
 *
 * Navy panels part to reveal the montage behind them, driven by scroll
 * position rather than a timer, matching the reference site: the hero is
 * pinned with `position: sticky` inside a taller track and the panels open
 * across that track's travel.
 *
 * It differs from the Broadsheet opener on purpose, so the two concepts still
 * read as two ideas. Broadsheet parts a sheet of paper and splits the wordmark
 * across it. Here the hero copy sits ABOVE the panels and never moves: the
 * headline, the lede and the buttons are readable against the closed navy from
 * the first frame, and what the parting reveals is the film behind them. The
 * panels are the same navy as the hero's own scrim, so the type is identical
 * before and after and nothing has to be restyled mid-open.
 *
 * That also means this opener gates nothing at all. Everything a visitor came
 * to read is on screen at scroll zero; only the imagery is held back.
 *
 * Plays on every load, like the Broadsheet opener, so the client can refresh
 * and demo it repeatedly. Reduced motion still skips it entirely.
 *
 * No React state: the skip decision has to happen before first paint, so it is
 * made by a small script during parse, the pattern components/Loader.tsx
 * already uses.
 */
const BOOT = `(function(){try{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.setAttribute('data-curtain','skip')
  }
}catch(e){}})()`;

export function Curtain() {
  return (
    <>
      {/* Runs during parse, before the panels below are painted. */}
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <CurtainScroll cssVar="--cc" trackAttr="data-cc-track" skipAttr="data-curtain" />
      <div
        className="c-curtain pointer-events-none absolute inset-0 z-30 overflow-hidden"
        aria-hidden="true"
      >
        <div className="c-curtain-l absolute left-0 top-0 h-full w-1/2" />
        <div className="c-curtain-r absolute right-0 top-0 h-full w-1/2" />
        {/* The seam catches the light as it parts. */}
        <div className="c-curtain-seam absolute inset-y-0 left-1/2 w-px" />
      </div>
    </>
  );
}

/**
 * Marquee band. Two identical tracks side by side, translated by half, so the
 * loop is seamless. Duration is set per instance so two bands on one page do
 * not move in lockstep.
 */
export function Marquee({
  items,
  seconds = 40,
  reverse = false,
  textClassName = "text-[clamp(1.6rem,3.4vw,3rem)]",
  gap = "gap-8 pr-8",
}: {
  items: readonly string[];
  seconds?: number;
  reverse?: boolean;
  /** Size of the running text. A slim band needs far less than a full band. */
  textClassName?: string;
  gap?: string;
}) {
  const track: ReactNode[] = [...items, ...items];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="c-marquee"
        style={{
          ["--md" as string]: `${seconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((t, i) => (
          <span
            key={i}
            className={`c-display flex shrink-0 items-center whitespace-nowrap ${gap} ${textClassName}`}
          >
            {t}
            {/* A hairline, not a bullet or a dot. */}
            <span
              className="inline-block h-[1.1em] w-px shrink-0"
              style={{ background: "var(--c-accent)", opacity: 0.55 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

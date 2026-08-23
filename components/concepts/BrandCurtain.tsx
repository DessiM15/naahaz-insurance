import { Wordmark } from "@/components/logo/wordmark";
import { ACTIVE_LOGO } from "@/components/logo/active";
import { CurtainScroll } from "./CurtainScroll";

/**
 * The Broadsheet opener.
 *
 * Two paper panels part to reveal the hero, and the NAAHAZ wordmark splits
 * with them, NAA riding left and HAZ riding right. The parting is driven by
 * scroll position rather than a timer, matching the reference site: the hero
 * is pinned with `position: sticky` inside a taller track, and the panels open
 * across that track's travel.
 *
 * The split is free rather than fudged. In the wordmark's own grid the third
 * letter ends at x=108 and the fourth begins at x=118 on a 226 wide viewBox,
 * so the gap straddles the exact centre. Each panel carries a full copy of the
 * wordmark, positioned so its centre sits on the seam and clipped to its own
 * half. When the panel moves, its half goes with it. No measuring, no magic
 * numbers, and it stays correct if the letterforms are ever redrawn.
 *
 * WHAT KEEPS THIS FROM GATING INFORMATION, which the brief treats as automatic
 * rejection:
 *
 *   - the h1 and the hero copy are server rendered underneath and are never
 *     display:none, so nothing is hidden from a crawler or a screen reader
 *   - the service marquee sits ABOVE this layer rather than behind it, so all
 *     eight lines of business and the brand name are readable at scroll zero
 *   - a visitor who does not scroll is not stranded: see CurtainScroll, which
 *     opens the panels on its own after a few seconds of no input
 *   - the panels are aria-hidden and pointer-events-none, so a tap during the
 *     parting lands on whatever is underneath
 *
 * It plays on every load. There is no once-per-session flag, because these
 * pages exist to be shown, and the client refreshing to demo them should see
 * the opener every time. On a live site the usual choice is the opposite: add
 * a sessionStorage check back into BOOT and returning visitors skip it.
 *
 * The skip decision has to happen before first paint, so it is made by a small
 * script during parse, matching the pattern components/Loader.tsx already uses.
 */
const BOOT = `(function(){try{
  var skip = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.setAttribute('data-brandcurtain', skip ? 'skip' : 'play')
}catch(e){}})()`;

/** One half of the wordmark, centred on the seam and clipped to its side. */
function Half({ side }: { side: "left" | "right" }) {
  return (
    <div
      className="absolute top-1/2 w-[clamp(15rem,36vw,28rem)]"
      style={{
        // The wordmark's centre has to land on the seam, which is this panel's
        // inner edge. Pinning that edge to 0 and translating by half the
        // element's OWN width does it. A percentage offset would not: on an
        // absolutely positioned box, `right` resolves against the containing
        // block, so -50% meant a quarter of the viewport and the two halves
        // overlapped into "NAAZ".
        [side === "left" ? "right" : "left"]: 0,
        transform: `translate(${side === "left" ? "50%" : "-50%"}, -50%)`,
        clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
      }}
    >
      <Wordmark
        variant={ACTIVE_LOGO.kind === "wordmark" ? ACTIVE_LOGO.id : "wordmark-bars"}
        stroke="var(--c-ink)"
        accent="var(--c-accent)"
        className="w-full"
      />
    </div>
  );
}

export function BrandCurtain() {
  return (
    <>
      {/* Runs during parse, before the panels below are painted. */}
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <CurtainScroll />
      <div
        className="c-brandcurtain pointer-events-none absolute inset-0 z-30 overflow-hidden"
        aria-hidden="true"
      >
        <div className="c-bc-l absolute left-0 top-0 h-full w-1/2">
          <Half side="left" />
        </div>
        <div className="c-bc-r absolute right-0 top-0 h-full w-1/2">
          <Half side="right" />
        </div>
        {/* A gold hairline on the seam, which is where the name comes apart. */}
        <div className="c-bc-seam absolute inset-y-0 left-1/2 w-px" />
      </div>
    </>
  );
}

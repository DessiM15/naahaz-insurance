"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ACTIVE_LOGO, activeGeometry } from "@/components/logo/active";
import { site } from "@/lib/site";

/**
 * The loading screen.
 *
 *   0.00s  dark field
 *   0.15s  mark strokes itself on (path draw)
 *   0.85s  NAAHAZ wordmark letters stagger up
 *   1.15s  tagline fades in
 *   1.35s  two panels split vertically and sweep away
 *   1.60s  done, removed from the DOM
 *
 * Shown on the first arrival of a browser session only. Returning visitors
 * are handled by the inline script in app/layout.tsx, which hides this before
 * first paint so there is no flash — see LOADER_BOOT_SCRIPT.
 *
 * Under prefers-reduced-motion the whole sequence collapses to a 200ms fade.
 */

const WORDMARK = "NAAHAZ".split("");

export function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Returning visitor — the boot script already hid us. Unmount immediately.
    if (document.documentElement.dataset.loader === "skip") {
      setDone(true);
      return;
    }

    document.body.dataset.loading = "true";
    sessionStorage.setItem("naahaz:loader-seen", "1");

    const total = reduced ? 200 : 1600;
    const timer = window.setTimeout(() => {
      document.body.removeAttribute("data-loading");
      setDone(true);
      // Hand a clean top-of-page to the user the moment the curtain lifts.
      window.scrollTo(0, 0);
    }, total);

    return () => {
      window.clearTimeout(timer);
      document.body.removeAttribute("data-loading");
    };
  }, [reduced]);

  if (done) return null;

  const geometry = activeGeometry();
  const isWordmark = ACTIVE_LOGO.kind === "wordmark";

  if (reduced) {
    return (
      <div
        id="naahaz-loader"
        ref={rootRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950 transition-opacity duration-200"
        aria-hidden
      >
        <svg
          viewBox={geometry.viewBox}
          className={isWordmark ? "w-[min(70vw,340px)]" : "w-[88px]"}
          aria-hidden
        >
          {geometry.strokes.map((s, i) => (
            <path
              key={i}
              d={s.d}
              fill="none"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke={s.gold ? "var(--color-gold-500)" : "var(--color-ink-50)"}
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div id="naahaz-loader" ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden>
      {/* Two panels that split apart to reveal the page. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-navy-950"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 1.35, duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-950"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.35, duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
      />

      {/* Mark, wordmark, tagline — fade out just before the panels move. */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.24, duration: 0.28, ease: "easeIn" }}
      >
        <motion.svg
          viewBox={geometry.viewBox}
          className={isWordmark ? "w-[min(74vw,400px)]" : "w-[min(28vw,110px)]"}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MarkPaths />
        </motion.svg>

        {!isWordmark && (
        <div className="flex overflow-hidden" aria-hidden>
          {WORDMARK.map((letter, i) => (
            <motion.span
              key={i}
              className="text-[clamp(1.1rem,3.4vw,1.6rem)] font-semibold tracking-[0.42em] text-ink-50"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: 0.85 + i * 0.055,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        )}

        <motion.span
          className="text-[0.7rem] tracking-[0.3em] text-ink-500 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.4 }}
        >
          {site.tagline}
        </motion.span>
      </motion.div>
    </div>
  );
}

/**
 * The active logo, drawn on stroke by stroke. Reads its geometry from
 * components/logo/active.ts, so picking a different logo changes the loading
 * animation with it — there is no second copy of the paths to update.
 */
function MarkPaths() {
  const { strokes } = activeGeometry();

  // Spread the draw across a fixed window regardless of how many strokes the
  // chosen logo has — the clean wordmark has ten, the one-line mark has two.
  const window = 0.62;
  const step = strokes.length > 1 ? window / (strokes.length - 1) : 0;

  return (
    <g>
      {strokes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          strokeWidth={s.width ?? 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={s.gold ? "var(--color-gold-500)" : "var(--color-ink-50)"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: 0.15 + i * step, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            opacity: { delay: 0.15 + i * step, duration: 0.12 },
          }}
        />
      ))}
    </g>
  );
}

/**
 * Runs before first paint. Marks returning visitors so the loader is hidden
 * with CSS rather than mounting and flashing.
 */
export const LOADER_BOOT_SCRIPT = `
try {
  var seen = sessionStorage.getItem('naahaz:loader-seen');
  document.documentElement.dataset.loader = seen ? 'skip' : 'play';
} catch (e) {
  document.documentElement.dataset.loader = 'play';
}
try { history.scrollRestoration = 'manual'; } catch (e) {}
`.trim();

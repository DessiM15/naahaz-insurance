"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FULL_MARKS } from "@/components/logo/marks";
import { ACTIVE_CONCEPT } from "@/components/logo/Logo";
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

  const Mark = FULL_MARKS[ACTIVE_CONCEPT];

  if (reduced) {
    return (
      <div
        id="naahaz-loader"
        ref={rootRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950 transition-opacity duration-200"
        aria-hidden
      >
        <Mark style={{ width: 88, height: 88 }} stroke="var(--color-ink-50)" accent="var(--color-gold-500)" />
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
          viewBox={ACTIVE_CONCEPT === "wordmark" ? "0 0 236 52" : "0 0 68 60"}
          className={ACTIVE_CONCEPT === "wordmark" ? "w-[min(70vw,380px)]" : "w-[min(28vw,110px)]"}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MarkPaths />
        </motion.svg>

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
 * The active mark, re-declared as animated paths so each stroke can draw
 * itself on. Kept in sync with components/logo/marks.tsx.
 */
function MarkPaths() {
  const common = {
    fill: "none",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { delay: 0.15 + i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { delay: 0.15 + i * 0.13, duration: 0.15 },
    },
  });

  const PATHS: Record<string, { d: string; gold?: boolean }[]> = {
    monogram: [
      { d: "M6 54 V6" },
      { d: "M6 6 L34 54" },
      { d: "M34 54 V6" },
      { d: "M34 6 L62 54" },
      { d: "M34 38 H52", gold: true },
    ],
    shield: [
      { d: "M32 3 L60 13.5 V35 C60 50 47.5 60 32 65 C16.5 60 4 50 4 35 V13.5 Z" },
      { d: "M19 30 L32 39 L45 30", gold: true },
      { d: "M19 41 L32 50 L45 41", gold: true },
    ],
    ascend: [
      { d: "M4 52 L32 8 L60 52" },
      { d: "M17 52 L32 29 L47 52", gold: true },
    ],
    wordmark: [
      { d: "M4 44 V4 M4 4 L32 44 M32 44 V4" },
      { d: "M42 44 L56 4 L70 44 M49 29 H63" },
      { d: "M80 44 L94 4 L108 44 M87 29 H101" },
      { d: "M118 44 V4 M146 44 V4" },
      { d: "M156 44 L170 4 L184 44 M163 29 H177" },
      { d: "M194 4 H222 L194 44 H222" },
      { d: "M4 24 H232", gold: true },
    ],
  };

  return (
    <g>
      {PATHS[ACTIVE_CONCEPT].map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          {...common}
          stroke={p.gold ? "var(--color-gold-500)" : "var(--color-ink-50)"}
          {...draw(i)}
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

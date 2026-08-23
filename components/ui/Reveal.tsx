"use client";

import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

/**
 * Whether to hold this element still.
 *
 * Reading the motion preference during render used to produce markup that
 * disagreed with the server, and React threw a hydration mismatch at every
 * visitor who had asked for reduced motion. That is the worst possible group
 * to break.
 *
 * useSyncExternalStore is the primitive built for exactly this: it takes a
 * separate server snapshot, so the server and the first client render always
 * agree, and React re-renders once with the real value afterwards. It also
 * subscribes, so a visitor who changes the setting mid-session is respected
 * without a reload.
 */
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useStill() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/**
 * Scroll-driven reveal. The workhorse of the site's motion.
 *
 * Under prefers-reduced-motion the element still appears — it just doesn't
 * travel. Nothing is ever hidden from someone who has asked for less motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const still = useStill();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        still
          ? { duration: 0 }
          : { delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose lines mask upward in sequence. Used for section headings
 * where the extra beat is worth it — not for every heading on the page.
 *
 * `as` matters: when this renders the main headline of a page it must be an
 * h1, not an h2. Defaulting it to h2 once left several pages with no h1 at
 * all, which search engines notice.
 *
 * It animates on mount rather than on scroll, and that is a bug fix rather
 * than a preference. Driven by whileInView, a headline sitting above the fold
 * could be left parked at translateY(105%) inside its own overflow-hidden
 * mask — present in the HTML, occupying its full height, and completely
 * invisible. The blog index shipped for a day with an h1 nobody could see.
 *
 * A mask that fails closed hides content, so it must not depend on an
 * observer firing. The cost is that a heading further down the page has
 * usually finished animating before you reach it, which is a far cheaper
 * failure than an invisible headline.
 */
export function RevealLines({
  lines,
  className = "",
  id,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const still = useStill();

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={
              still
                ? { duration: 0 }
                : { delay: i * 0.09, duration: 0.85, ease: [0.16, 1, 0.3, 1] }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

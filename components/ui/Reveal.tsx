"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

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
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
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
  const reduced = useReducedMotion();

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: reduced ? 0 : "105%", opacity: reduced ? 0 : 1 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.09, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

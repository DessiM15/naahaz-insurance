"use client";

import type { ReactNode } from "react";

/**
 * Word-level stagger. Every word gets its own delay, stepping evenly, so a
 * headline arrives as a sentence being spoken rather than a block appearing.
 *
 * The animation is pure CSS with the delay set inline, which means it is
 * server-rendered and starts on first paint. A framer-motion version cannot,
 * because it has to hydrate first, and the delay before a hero headline moves
 * is exactly the delay a visitor reads as "slow site".
 */
export function Words({
  text,
  step = 0.045,
  start = 0,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  /** Seconds between words. */
  step?: number;
  /** Seconds before the first word. */
  start?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.22em]">
          <span
            className="c-word"
            style={{ ["--wd" as string]: `${(start + i * step).toFixed(3)}s` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Same idea, but the caller supplies the nodes, so a word can be italic gold
 * without the component having to parse markup out of a string.
 */
export function WordNodes({
  nodes,
  step = 0.045,
  start = 0,
  className = "",
  as: Tag = "span",
}: {
  nodes: ReactNode[];
  step?: number;
  start?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
}) {
  return (
    <Tag className={className}>
      {nodes.map((n, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.22em]">
          <span
            className="c-word"
            style={{ ["--wd" as string]: `${(start + i * step).toFixed(3)}s` }}
          >
            {n}
          </span>
          {i < nodes.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

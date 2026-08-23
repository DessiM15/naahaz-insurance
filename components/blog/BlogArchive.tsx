"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/media/Photo";
import { formatDate, readingTime, type PostCard } from "@/lib/blog";

/**
 * The archive, with topic filtering.
 *
 * Set as an indexed list rather than a grid of cards. A card grid gives every
 * article the same weight, which is wrong once one of them is the lead — and
 * a dated, ruled list is what the section front of a newspaper actually looks
 * like. It also degrades far better at three posts than a grid does.
 *
 * Filtering is client state, so the whole list is in the HTML on first paint
 * and every article is crawlable regardless of which chip is active.
 */
const ALL = "All topics";

export function BlogArchive({ posts, tags }: { posts: PostCard[]; tags: string[] }) {
  const [active, setActive] = useState(ALL);
  const reduced = useReducedMotion();

  const shown = active === ALL ? posts : posts.filter((p) => p.tag === active);

  return (
    <div>
      {/* ------------------------------------------------------- topic chips */}
      <div className="flex flex-wrap items-center gap-2.5 border-b pb-8" style={{ borderColor: "var(--c-hairline)" }}>
        <span className="bs-label mr-2">Browse</span>
        {[ALL, ...tags].map((tag) => {
          const on = tag === active;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={on}
              className="min-h-0 border px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300"
              style={
                on
                  ? { background: "var(--c-deep)", color: "var(--c-on-deep)", borderColor: "var(--c-deep)" }
                  : { color: "var(--c-ink-soft)", borderColor: "var(--c-hairline)" }
              }
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------------- the list */}
      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-b"
              style={{ borderColor: "var(--c-hairline)" }}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-6 py-9 sm:grid-cols-[13rem_1fr] sm:gap-9"
              >
                <div className="relative aspect-4/3 overflow-hidden sm:aspect-3/2">
                  <Photo
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 208px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bs-label flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span style={{ color: "var(--c-accent-deep)" }}>{p.tag}</span>
                    <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                    <time dateTime={p.published}>{formatDate(p.published)}</time>
                    <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                    <span>{readingTime(p.words)} min read</span>
                  </div>

                  <h3
                    className="c-display mt-3 text-[clamp(1.35rem,2.5vw,1.95rem)] transition-colors"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {p.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                    {p.description}
                  </p>

                  <span
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--c-ink)", borderColor: "var(--c-accent)" }}
                  >
                    Read the article
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {shown.length === 0 && (
        <p className="py-16 text-center" style={{ color: "var(--c-ink-soft)" }}>
          Nothing filed under {active} yet.
        </p>
      )}
    </div>
  );
}

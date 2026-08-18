"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Duotone } from "@/components/media/Duotone";
import { site } from "@/lib/site";
import heroImage from "@/public/images/hero/horizon-couple.jpg";

/**
 * Homepage hero.
 *
 * Three parallax layers at 0.3× / 0.6× / 1.0× scroll, a drifting navy→gold
 * mesh gradient, and film grain. The headline is his existing H1 verbatim —
 * "Protecting What Matters" — with the last word set in italic serif gold.
 * Keeping his H1 preserves the SEO footprint the current site already has.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layer 1 — photograph, slowest.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  // Layer 2 — gradient wash, mid.
  const washY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "10%"]);
  // Layer 3 — copy, full speed, fading as it leaves.
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-14%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);

  const rise = {
    initial: { y: reduced ? 0 : 34, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-end overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* --- Layer 1: photograph ------------------------------------------ */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Duotone
          src={heroImage}
          alt="An older couple sitting together on a headland, looking out across the water"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* --- Layer 2: scrims + mesh --------------------------------------- */}
      <motion.div style={{ y: washY }} className="absolute inset-0" aria-hidden>
        {/* Readability scrim. Guarantees AA contrast for the headline. */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/72 to-navy-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/20 to-transparent" />
        <div className="mesh-drift absolute inset-0 opacity-70" />
      </motion.div>

      {/* --- Layer 3: copy ------------------------------------------------ */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-content relative z-10 pb-24 pt-40 sm:pb-32"
      >
        <div className="max-w-4xl">
          <motion.p
            {...rise}
            transition={{ delay: 0.1, duration: 0.7, ease }}
            className="mb-8 flex items-center gap-4 text-eyebrow font-medium uppercase text-gold-400"
          >
            <span className="h-px w-10 bg-gold-500" aria-hidden />
            Rolling Meadows, Illinois
          </motion.p>

          <h1 id="hero-heading" className="text-display font-semibold text-ink-50">
            <motion.span
              {...rise}
              transition={{ delay: 0.2, duration: 0.85, ease }}
              className="block"
            >
              Protecting
            </motion.span>
            <motion.span
              {...rise}
              transition={{ delay: 0.3, duration: 0.85, ease }}
              className="block"
            >
              What <span className="accent-word">Matters</span>
            </motion.span>
          </h1>

          <motion.p
            {...rise}
            transition={{ delay: 0.45, duration: 0.85, ease }}
            className="mt-9 max-w-2xl text-lead text-ink-300"
          >
            We are committed to safeguarding your assets, your loved ones, and your
            future with comprehensive insurance solutions — so you can live and work
            with confidence.
          </motion.p>

          <motion.div
            {...rise}
            transition={{ delay: 0.58, duration: 0.85, ease }}
            className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gold-500 px-9 text-base font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_44px_-8px_var(--color-gold-500)]"
            >
              Book a Strategy Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M2 8h11M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-navy-600 bg-navy-900/40 px-9 text-base font-medium text-ink-50 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/60 hover:bg-navy-800/60"
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.p
            {...rise}
            transition={{ delay: 0.7, duration: 0.85, ease }}
            className="mt-10 text-[0.95rem] text-ink-500"
          >
            Or call us directly at{" "}
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
              className="inline-link text-ink-300 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-400"
            >
              {site.contact.phonePrimary}
            </a>
          </motion.p>
        </div>
      </motion.div>

      <div className="grain-layer" aria-hidden />
    </section>
  );
}

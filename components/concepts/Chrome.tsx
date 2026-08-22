"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, contact, concepts } from "@/content/concepts";

/**
 * Header shared by all four concepts.
 *
 * It is transparent over the hero and takes the concept's ground once the
 * visitor has scrolled past it, which is what lets every concept run a full
 * bleed hero without a bar cutting across the top of the footage.
 */
export function ConceptHeader({
  concept,
  invertOnHero = true,
}: {
  concept: string;
  /** False when the hero is light, so the transparent state uses ink instead. */
  invertOnHero?: boolean;
}) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = invertOnHero && !stuck;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: stuck ? "var(--c-ground)" : "transparent",
        borderBottom: `1px solid ${stuck ? "var(--c-hairline)" : "transparent"}`,
        color: overHero ? "var(--c-on-deep)" : "var(--c-ink)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href={`/concepts/${concept}`}
          className="flex items-baseline gap-2 text-[0.95rem] font-semibold tracking-[0.22em]"
        >
          NAAHAZ
          <span
            className="hidden text-[0.6rem] tracking-[0.3em] opacity-70 sm:inline"
            style={{ color: overHero ? "var(--c-accent)" : "var(--c-accent-deep)" }}
          >
            INSURANCE
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-[0.8rem] tracking-wide md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="opacity-80 transition-opacity hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneHref}
            className="hidden text-[0.8rem] tracking-wide opacity-80 transition-opacity hover:opacity-100 lg:inline"
          >
            {contact.phone}
          </a>
          <a
            href="#book"
            className="inline-flex items-center px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors"
            style={{
              background: overHero ? "var(--c-accent)" : "var(--c-deep)",
              color: overHero ? "#0b1220" : "var(--c-on-deep)",
            }}
          >
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Footer shared by all four. Carries the NAP block that has to stay identical
 * to the LocalBusiness schema, or the local ranking signal is wasted.
 */
export function ConceptFooter({ concept }: { concept: string }) {
  return (
    <footer className="on-deep">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-[0.95rem] font-semibold tracking-[0.22em]">NAAHAZ INSURANCE</p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed opacity-70">
              Independent insurance and financial services in Rolling Meadows, Illinois.
              Protecting what matters.
            </p>
          </div>

          <div className="text-[0.95rem] leading-relaxed opacity-80">
            <p className="c-eyebrow mb-4" style={{ color: "var(--c-accent)" }}>
              Office
            </p>
            <address className="not-italic">
              {contact.street}
              <br />
              {contact.city}, {contact.region} {contact.postal}
            </address>
            <p className="mt-4">
              <a href={contact.phoneHref} className="hover:opacity-70">
                {contact.phone}
              </a>
            </p>
          </div>

          <div className="text-[0.95rem] leading-relaxed opacity-80">
            <p className="c-eyebrow mb-4" style={{ color: "var(--c-accent)" }}>
              Other concepts
            </p>
            <ul className="space-y-2">
              {concepts
                .filter((c) => c.slug !== concept)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/concepts/${c.slug}`} className="hover:opacity-70">
                      {c.name}
                    </Link>
                  </li>
                ))}
              <li className="pt-2">
                <Link href="/concepts" className="hover:opacity-70" style={{ color: "var(--c-accent)" }}>
                  All four
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-[0.75rem] leading-relaxed opacity-45">
          Design concept for NAAHAZ Inc. Not a live site. Information provided is general
          guidance, not specific financial advice. Products mentioned may be unavailable in
          your state. Headshots, license numbers, carrier list and testimonials are shown as
          placeholders pending client sign off.
        </p>
      </div>
    </footer>
  );
}

/**
 * FAQ list. Native details and summary so the answers are in the HTML on first
 * paint. If the answer only exists after a click, it cannot be quoted by an AI
 * overview and it cannot win a featured snippet.
 */
export function ConceptFaqs({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y" style={{ borderColor: "var(--c-hairline)" }}>
      {items.map((f) => (
        <details key={f.q} className="group py-6" style={{ borderColor: "var(--c-hairline)" }}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-[1.05rem] font-medium leading-snug marker:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-xl leading-none transition-transform duration-300 group-open:rotate-45"
              style={{ color: "var(--c-accent-deep)" }}
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { services } from "@/content/concepts";

/**
 * The service index.
 *
 * On desktop the list is typographic and one large photograph swaps as the
 * pointer moves down it, so all eight lines of business fit in a single
 * viewport with no grid of boxes anywhere. Hovering a name is what reveals
 * that service's promise, so the interaction delivers the information rather
 * than hiding it: the active line's summary is always on screen, and the
 * first one is active before anyone touches anything.
 *
 * On mobile it becomes stacked full bleed panels. Never a horizontal scroll,
 * never a hover dependency.
 */
export function ServiceIndex({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
      {/* ------------------------------------------------------ desktop list */}
      <div className="hidden flex-col justify-center px-6 py-16 lg:flex lg:px-14">
        <ul className="w-full">
          {services.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className="group flex w-full items-baseline gap-6 border-b py-[1.1rem] text-left transition-colors"
                  style={{ borderColor: "var(--c-hairline)" }}
                >
                  <span
                    className="w-8 shrink-0 text-[0.68rem] tracking-[0.18em] transition-opacity"
                    style={{
                      color: "var(--c-accent-deep)",
                      opacity: on ? 1 : 0.4,
                    }}
                  >
                    {item.n}
                  </span>
                  <span
                    className="c-display text-[clamp(1.5rem,2.5vw,2.35rem)] transition-all duration-300"
                    style={{
                      color: on ? "var(--c-ink)" : "var(--c-ink-soft)",
                      transform: on ? "translateX(10px)" : "none",
                      fontStyle: on ? "italic" : "normal",
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p
          key={s.slug}
          className="c-in mt-10 max-w-md text-[1.02rem] leading-relaxed"
          style={{ color: "var(--c-ink-soft)", ["--wd" as string]: "0s" }}
        >
          <span className="font-medium" style={{ color: "var(--c-ink)" }}>
            {s.line}{" "}
          </span>
          {s.body}
        </p>
      </div>

      {/* ----------------------------------------------------- desktop photo */}
      <div className="relative hidden min-h-[38rem] overflow-hidden lg:block">
        {services.map((item, i) => (
          <div
            key={item.slug}
            aria-hidden={i !== active}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Photo
              src={item.image}
              alt={item.alt}
              fill
              sizes="50vw"
              className="object-cover"
              style={{
                transform: i === active ? "scale(1)" : "scale(1.05)",
                transition: "transform 1.4s cubic-bezier(.16,1,.3,1)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  tone === "dark"
                    ? "color-mix(in oklab, var(--c-deep) 30%, transparent)"
                    : "color-mix(in oklab, var(--c-deep) 14%, transparent)",
              }}
            />
          </div>
        ))}
      </div>

      {/* -------------------------------------------------------------- mobile */}
      <ul className="lg:hidden">
        {services.map((item) => (
          <li key={item.slug} className="relative isolate">
            <div className="c-scrim relative h-[19rem] w-full overflow-hidden">
              <Photo
                src={item.image}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7">
              <p className="text-[0.66rem] tracking-[0.24em]" style={{ color: "var(--c-accent)" }}>
                {item.n}
              </p>
              <h3 className="c-display mt-2 text-[1.75rem]" style={{ color: "var(--c-on-deep)" }}>
                {item.name}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-snug" style={{ color: "var(--c-on-deep-soft)" }}>
                {item.line}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

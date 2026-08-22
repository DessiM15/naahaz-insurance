import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/concepts/HeroVideo";
import { Words } from "@/components/concepts/Words";
import { ConceptHeader, ConceptFooter, ConceptFaqs } from "@/components/concepts/Chrome";
import { faqs, factsSource, process, services, areaServed, contact } from "@/content/concepts";

export const metadata: Metadata = { title: "The Atelier" };

/**
 * CONCEPT TWO: THE ATELIER
 *
 * Chalk white, near black navy, champagne. Quiet and expensive.
 *
 * The device is typographic tension, borrowed from the luxury reference the
 * client liked and inverted out of the dark: display type set very large and
 * very tight against labels set very small and very wide. That contrast is
 * what reads as chic, and it survives the move into light untouched.
 *
 * The hero video is held inside the layout rather than run behind it, which is
 * the third distinct hero treatment across the four concepts.
 *
 *   1 hero, type left, framed video right        HIGH   chalk
 *   2 the statement, one sentence                LOW    chalk, huge type
 *   3 the lines of business, editorial rows      HIGH   tint
 *   4 the method                                 LOW    deep navy
 *   5 the Illinois rule, full bleed              HIGH   photo
 *   6 answers                                    LOW    chalk
 *   7 book                                       HIGH   tint
 */
export default function Atelier() {
  return (
    <div data-concept="atelier">
      <ConceptHeader concept="atelier" invertOnHero={false} />

      {/* ═══════════════════════════════════════════════ 1. HERO ── HIGH ── */}
      <section className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pt-36">
        <div>
          <p
            className="c-in c-eyebrow"
            style={{ ["--wd" as string]: "0.1s" }}
          >
            Insurance and financial services · Rolling Meadows, Illinois
          </p>

          {/* The whole concept in one line: -0.045em on the display, +0.24em
              on the label above it. */}
          <h1
            className="c-display mt-8 text-[clamp(3rem,8.6vw,7.6rem)]"
            style={{ letterSpacing: "-0.045em", lineHeight: 0.92 }}
          >
            <Words text="Protecting" step={0.05} start={0.25} className="block" />
            <Words text="what" step={0.05} start={0.4} className="block" />
            <span className="block" style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>
              <Words text="matters." step={0.05} start={0.52} />
            </span>
          </h1>

          <p
            className="c-in mt-10 max-w-md text-[1.05rem] leading-relaxed"
            style={{ color: "var(--c-ink-soft)", ["--wd" as string]: "0.85s" }}
          >
            Independent. Fifteen lines of business. One family that has been doing this long
            enough to tell you when you do not need what you came in asking for.
          </p>

          <div
            className="c-in mt-11 flex flex-wrap items-center gap-6"
            style={{ ["--wd" as string]: "0.95s" }}
          >
            <a
              href="#book"
              className="inline-flex items-center px-9 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--c-deep)", color: "var(--c-on-deep)" }}
            >
              Book a call
            </a>
            <a
              href={contact.phoneHref}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] underline underline-offset-[6px]"
              style={{ color: "var(--c-ink-soft)" }}
            >
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Video held inside the layout, tall crop, no bleed. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]">
          <HeroVideo
            src="/video/hero-generations.mp4"
            poster="/video/poster-generations.jpg"
            alt="Four generations of one family walking together across a field at sunset, seen in silhouette"
            overlayClassName="bg-[linear-gradient(to_top,rgba(11,18,32,0.45)_0%,rgba(11,18,32,0.05)_55%)]"
          />
        </div>
      </section>

      {/* ═════════════════════════════════════════ 2. STATEMENT ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-32 lg:px-10 lg:py-44" id="about">
        <RevealLines
          className="c-display mx-auto max-w-[22ch] text-center text-[clamp(2.2rem,6.2vw,5.4rem)]"
          lines={[
            "Everyone sells you",
            <span key="b" style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>
              a policy.
            </span>,
            "We sell you the",
            <span key="d" style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>
              right one.
            </span>,
          ]}
        />
        <Reveal delay={0.3}>
          <p
            className="mx-auto mt-14 max-w-xl text-center text-[1.02rem] leading-relaxed"
            style={{ color: "var(--c-ink-soft)" }}
          >
            Naureen and Aziz Ali are independent, which means no carrier writes their paycheck
            and no carrier writes their advice. They compare, they show you the math, and they
            are still the ones answering the phone a decade later.
          </p>
        </Reveal>
        <Reveal delay={0.38}>
          <p
            className="mx-auto mt-8 max-w-xl text-center text-[0.78rem] tracking-[0.14em]"
            style={{ color: "var(--c-ink-soft)" }}
          >
            {areaServed.join(" · ")}
          </p>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════ 3. THE LINES ── HIGH ── */}
      <section className="on-tint" id="services">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-6 border-b pb-8" style={{ borderColor: "var(--c-hairline)" }}>
              <h2 className="c-eyebrow">What we cover</h2>
              <p className="text-[0.85rem]" style={{ color: "var(--c-ink-soft)" }}>
                Eight of fifteen. Ask about the rest.
              </p>
            </div>
          </Reveal>

          {/* Alternating editorial rows. The photograph is the container. */}
          <div className="mt-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={0.05}>
                <article
                  className={`grid items-center gap-8 border-b py-10 lg:gap-16 lg:py-14 ${
                    i % 2 === 1 ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
                  }`}
                  style={{ borderColor: "var(--c-hairline)" }}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-baseline gap-5">
                      <span className="c-eyebrow">{s.n}</span>
                      <h3
                        className="c-display text-[clamp(1.7rem,3.4vw,2.9rem)]"
                        style={{ letterSpacing: "-0.035em" }}
                      >
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed">{s.line}</p>
                    <p
                      className="mt-3 max-w-lg text-[0.96rem] leading-relaxed"
                      style={{ color: "var(--c-ink-soft)" }}
                    >
                      {s.body}
                    </p>
                  </div>

                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden lg:aspect-[16/11] ${
                      i % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <Photo
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-[1.4s] hover:scale-[1.04]"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ 4. METHOD ── LOW ── */}
      <section className="on-deep" id="process">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-40">
          <Reveal>
            <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              The method
            </p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-3 lg:gap-20">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={0.08 + i * 0.08}>
                <p
                  className="c-display text-[clamp(3rem,6vw,5rem)] leading-none"
                  style={{ color: "var(--c-accent)", opacity: 0.85, letterSpacing: "-0.05em" }}
                >
                  {step.n}
                </p>
                <h3 className="mt-7 text-[1.15rem] font-medium">{step.title}</h3>
                <p
                  className="mt-4 text-[0.98rem] leading-relaxed"
                  style={{ color: "var(--c-on-deep-soft)" }}
                >
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 5. THE ILLINOIS RULE ── HIGH ── */}
      <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden">
        <Photo
          src="/images/detail/medicare.jpg"
          alt="An older couple at home reviewing Medicare paperwork together"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,18,32,0.94) 0%, rgba(11,18,32,0.82) 42%, rgba(11,18,32,0.28) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <Reveal>
              <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
                Illinois only
              </p>
            </Reveal>
            <RevealLines
              className="c-display mt-8 text-[clamp(2.2rem,5.6vw,4.8rem)]"
              lines={[
                <span key="a" style={{ color: "var(--c-on-deep)", letterSpacing: "-0.04em" }}>
                  45 days.
                </span>,
                <span key="b" style={{ color: "var(--c-on-deep)", letterSpacing: "-0.04em" }}>
                  Every{" "}
                  <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>birthday.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.2}>
              <p
                className="mt-9 max-w-xl text-[1.05rem] leading-relaxed"
                style={{ color: "rgba(242,240,234,0.8)" }}
              >
                Illinois has a Medigap birthday rule. Between 65 and 75, you can move to another
                Medigap plan with equal or lesser benefits in a 45 day window starting on your
                birthday, with no health questions and no underwriting. Most states have nothing
                like it, and most agents never bring it up. We will tell you when yours opens.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ 6. ANSWERS ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36" id="answers">
        <Reveal>
          <h2
            className="c-display max-w-[16ch] text-[clamp(2rem,4.8vw,4rem)]"
            style={{ letterSpacing: "-0.04em" }}
          >
            The questions people actually{" "}
            <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>type in.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-14 lg:pl-[38%]">
            <ConceptFaqs items={faqs} />
            <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--c-hairline)" }}>
              <p className="text-[0.8rem]" style={{ color: "var(--c-ink-soft)" }}>
                {factsSource.asOf}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {factsSource.sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                      className="text-[0.78rem] underline underline-offset-4 hover:opacity-70"
                      style={{ color: "var(--c-accent-deep)" }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════ 7. BOOK ── HIGH ── */}
      <section className="on-tint" id="book">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10 lg:py-32">
          <div>
            <Reveal>
              <p className="c-eyebrow">No cost, no obligation</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="c-display mt-7 text-[clamp(2.2rem,4.8vw,4rem)]"
                style={{ letterSpacing: "-0.04em" }}
              >
                Twenty minutes.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>
                  Nothing sold.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                className="mt-8 max-w-md text-[1.02rem] leading-relaxed"
                style={{ color: "var(--c-ink-soft)" }}
              >
                Bring what you already have. If we cannot improve on it, we will say so, and you
                will have lost twenty minutes.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-11 flex flex-wrap items-center gap-6">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center px-9 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--c-deep)", color: "var(--c-on-deep)" }}
                >
                  Call {contact.phone}
                </a>
                <address className="not-italic text-[0.9rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {contact.street}
                  <br />
                  {contact.city}, {contact.region} {contact.postal}
                </address>
              </div>
            </Reveal>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
            <Photo
              src="/images/sections/kitchen-table.jpg"
              alt="Grandparents and their grandchildren around a kitchen table together"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <ConceptFooter concept="atelier" />
    </div>
  );
}

import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/concepts/HeroVideo";
import { WordNodes } from "@/components/concepts/Words";
import { ConceptHeader, ConceptFooter, ConceptFaqs } from "@/components/concepts/Chrome";
import { ServiceIndex } from "@/components/concepts/ServiceIndex";
import { faqs, factsSource, process, verbatim, areaServed, contact } from "@/content/concepts";

export const metadata: Metadata = { title: "The Institution" };

/**
 * CONCEPT FOUR: THE INSTITUTION
 *
 * The client's existing navy and gold, in the dark, built as well as the three
 * light concepts so the comparison is honest. If dark loses, it should lose on
 * taste rather than on effort.
 *
 * Dimension in a dark page is the hard part, because everything wants to
 * collapse into one flat navy. Four grounds keep it apart: base navy, raised
 * navy, near black, and full bleed photography.
 *
 *   1 hero, full bleed video                     HIGH   video
 *   2 the promise                                LOW    base navy
 *   3 service index                              HIGH   raised navy
 *   4 the method                                 LOW    near black
 *   5 the Illinois rule                          HIGH   photo
 *   6 answers                                    LOW    base navy
 *   7 book                                       HIGH   raised navy and photo
 */
export default function Institution() {
  return (
    <div data-concept="institution">
      <ConceptHeader concept="institution" />

      {/* ═══════════════════════════════════════════════ 1. HERO ── HIGH ── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <HeroVideo
          src="/video/hero-generations.mp4"
          poster="/video/poster-generations.jpg"
          alt="Four generations of one family walking together across a field at sunset, seen in silhouette"
          overlayClassName="bg-[linear-gradient(to_top,rgba(6,14,27,0.94)_0%,rgba(6,14,27,0.5)_45%,rgba(6,14,27,0.25)_78%,rgba(6,14,27,0.5)_100%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <p
                className="c-in c-eyebrow"
                style={{ color: "var(--c-accent)", ["--wd" as string]: "0.15s" }}
              >
                Since day one, independent
              </p>

              <WordNodes
                as="h1"
                start={0.3}
                step={0.065}
                className="c-display mt-7 max-w-[14ch] text-[clamp(2.9rem,8.4vw,7.4rem)]"
                nodes={[
                  "Protecting",
                  "what",
                  <span key="c" style={{ fontStyle: "italic", color: "var(--c-accent)" }}>
                    matters
                  </span>,
                ]}
              />
            </div>

            {/* Rule and copy, ledger style, aligned to the baseline of the head. */}
            <div
              className="c-in border-l pl-8"
              style={{ borderColor: "rgba(201,162,39,0.4)", ["--wd" as string]: "0.8s" }}
            >
              <p className="max-w-md text-[1.02rem] leading-relaxed" style={{ color: "rgba(244,246,250,0.78)" }}>
                {verbatim.heroSub}.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#book"
                  className="inline-flex items-center px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--c-accent)", color: "#0a1628" }}
                >
                  Book a call
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center border-b pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(244,246,250,0.9)", borderColor: "rgba(244,246,250,0.3)" }}
                >
                  What we cover
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ 2. PROMISE ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36" id="about">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
                Rolling Meadows, Illinois
              </p>
            </Reveal>
            <RevealLines
              className="c-display mt-7 text-[clamp(1.9rem,4.2vw,3.5rem)]"
              lines={[
                "Two names.",
                <span key="b" style={{ fontStyle: "italic", color: "var(--c-accent)" }}>
                  One promise.
                </span>,
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-9 max-w-md text-[1.05rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                Naureen and Aziz Ali have spent their careers on one question: what happens to
                this family if the worst day arrives. Everything here follows from the answer.
              </p>
            </Reveal>
          </div>

          <div className="lg:pt-4">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-[1.08rem] leading-relaxed" style={{ color: "var(--c-ink)" }}>
                {verbatim.mission}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                We are independent, which means we compare carriers rather than defend one, and
                the person who sold you the policy is still the person answering the phone ten
                years later.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p
                className="mt-10 border-t pt-6 text-[0.82rem] tracking-[0.1em]"
                style={{ color: "var(--c-ink-soft)", borderColor: "var(--c-hairline)" }}
              >
                {areaServed.join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ 3. SERVICE INDEX ── HIGH ── */}
      <section className="on-tint border-y" style={{ borderColor: "var(--c-hairline)" }} id="services">
        <div className="mx-auto max-w-[1440px] px-6 pt-20 lg:px-10 lg:pt-24">
          <Reveal>
            <h2 className="c-display max-w-[20ch] text-[clamp(2rem,4.4vw,3.5rem)]">
              Fifteen lines of business.{" "}
              <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>One person</span> who
              knows them all.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16">
          <ServiceIndex tone="dark" />
        </div>
      </section>

      {/* ════════════════════════════════════════════ 4. METHOD ── LOW ── */}
      <section style={{ background: "var(--c-deep)" }} id="process">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              How it works
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="c-display mt-6 max-w-[18ch] text-[clamp(2rem,4.4vw,3.5rem)]">
              Three steps, and none of them is a{" "}
              <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>sales pitch.</span>
            </h2>
          </Reveal>

          <ol className="mt-16 grid lg:grid-cols-3">
            {process.map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={0.08 + i * 0.08}
                className="border-t py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-0 lg:first:pl-0"
              >
                <p className="text-[0.68rem] tracking-[0.28em]" style={{ color: "var(--c-accent)" }}>
                  {step.n}
                </p>
                <h3 className="c-display mt-6 text-[1.6rem] leading-tight">{step.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════ 5. THE ILLINOIS RULE ── HIGH ── */}
      <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden">
        <Photo
          src="/images/sections/illinois-rule.jpg"
          alt="An older couple standing together at the water's edge at sunset, seen in silhouette"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,14,27,0.96) 0%, rgba(6,14,27,0.75) 46%, rgba(6,14,27,0.3) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal>
            <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              An Illinois right most people are never told about
            </p>
          </Reveal>
          <RevealLines
            className="c-display mt-7 max-w-[15ch] text-[clamp(2.1rem,5.2vw,4.4rem)]"
            lines={[
              "You get 45 days",
              <span key="b">
                every{" "}
                <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>birthday.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.22}>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: "rgba(244,246,250,0.8)" }}>
              Illinois is one of a handful of states with a Medigap birthday rule. Between 65 and
              75 you can move to another Medigap plan with equal or lesser benefits during a 45
              day window that starts on your birthday, with no health questions and no
              underwriting. Most agents never mention it. We will tell you when yours opens.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════ 6. ANSWERS ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36" id="answers">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <h2 className="c-display text-[clamp(1.9rem,3.6vw,3rem)]">
                The questions people
                <br />
                actually{" "}
                <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>type in.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--c-hairline)" }}>
                <p className="text-[0.8rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {factsSource.asOf}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {factsSource.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        className="text-[0.78rem] underline underline-offset-4 hover:opacity-70"
                        style={{ color: "var(--c-accent)" }}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ConceptFaqs items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════ 7. BOOK ── HIGH ── */}
      <section className="on-tint border-t" style={{ borderColor: "var(--c-hairline)" }} id="book">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[34rem]">
            <Photo
              src="/images/sections/kitchen-table.jpg"
              alt="Grandparents and their grandchildren around a kitchen table together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.35)" }} />
          </div>

          <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-24">
            <Reveal>
              <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
                No cost, no obligation
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="c-display mt-7 text-[clamp(2rem,4vw,3.4rem)]">
                Twenty minutes.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>Nothing sold.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-md text-[1.02rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                Tell us what you have and what worries you. If we cannot improve on it, we will
                say so and you will have lost twenty minutes.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-11 flex flex-wrap items-center gap-6">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--c-accent)", color: "#0a1628" }}
                >
                  Call {contact.phone}
                </a>
                <address className="not-italic text-[0.92rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {contact.street}
                  <br />
                  {contact.city}, {contact.region} {contact.postal}
                </address>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConceptFooter concept="institution" />
    </div>
  );
}

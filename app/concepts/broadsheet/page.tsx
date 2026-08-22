import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/concepts/HeroVideo";
import { WordNodes } from "@/components/concepts/Words";
import { ConceptHeader, ConceptFooter, ConceptFaqs } from "@/components/concepts/Chrome";
import { BrandCurtain } from "@/components/concepts/BrandCurtain";
import { Marquee } from "@/components/concepts/Curtain";
import { ServiceIndex } from "@/components/concepts/ServiceIndex";
import { faqs, factsSource, process, verbatim, areaServed, contact, services } from "@/content/concepts";

export const metadata: Metadata = { title: "The Broadsheet" };

/** Pulled from the service list itself so the band can never fall out of date. */
const band = services.map((s) => s.name);

/**
 * CONCEPT ONE: THE BROADSHEET
 *
 * Warm bone ground, navy ink, antique gold. Editorial and established.
 *
 * Section rhythm, HIGH activity against LOW, never two HIGH adjacent:
 *   1 hero, full bleed video                     HIGH   photo ground
 *   2 the promise, one statement                 LOW    bone
 *   3 service index, photo swaps on hover        HIGH   tint
 *   4 how it works, three steps                  LOW    deep navy
 *   5 the Illinois rule, full bleed              HIGH   photo ground
 *   6 answers, FAQ                               LOW    bone
 *   7 book, split panel                          HIGH   tint + photo
 * Four distinct grounds. No section repeats its neighbour.
 */
export default function Broadsheet() {
  return (
    <div data-concept="broadsheet">
      <ConceptHeader concept="broadsheet" />

      {/* ═══════════════════════════════════════════════ 1. HERO ── HIGH ── */}
      {/* The hero is pinned inside a taller track. The extra height is the
          travel the opener parts across, which is what makes it scroll driven.
          The track collapses to one viewport when the opener is skipped. */}
      <div data-bc-track className="c-bc-track relative">
        <section className="sticky top-0 isolate flex h-svh flex-col justify-end overflow-hidden pb-[4.5rem]">
        <HeroVideo
          src="/video/hero-generations.mp4"
          poster="/video/poster-generations.jpg"
          alt="Four generations of one family walking together across a field at sunset, seen in silhouette"
          overlayClassName="bg-[linear-gradient(to_top,rgba(14,27,46,0.92)_0%,rgba(14,27,46,0.55)_42%,rgba(14,27,46,0.22)_75%,rgba(14,27,46,0.42)_100%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-24">
          <p
            className="c-in c-eyebrow"
            style={{ color: "#d8b64a", ["--wd" as string]: "0.15s" }}
          >
            Rolling Meadows, Illinois
          </p>

          <WordNodes
            as="h1"
            start={0.3}
            step={0.06}
            className="c-display mt-6 max-w-[15ch] text-[clamp(2.9rem,8.2vw,7.2rem)]"
            nodes={[
              <span key="a" style={{ color: "var(--c-on-deep)" }}>
                Protecting
              </span>,
              <span key="b" style={{ color: "var(--c-on-deep)" }}>
                what
              </span>,
              <span key="c" style={{ fontStyle: "italic", color: "var(--c-accent)" }}>
                matters
              </span>,
            ]}
          />

          <div className="mt-9 max-w-xl">
            <p
              className="c-in max-w-xl text-[1.05rem] leading-relaxed"
              style={{ color: "rgba(244,239,228,0.82)", ["--wd" as string]: "0.75s" }}
            >
              {verbatim.heroSub}.
            </p>

            <div
              className="c-in mt-9 flex flex-wrap items-center gap-4"
              style={{ ["--wd" as string]: "0.9s" }}
            >
              <a
                href="#book"
                className="inline-flex items-center px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--c-accent)", color: "#0e1b2e" }}
              >
                Book a call
              </a>
              <a
                href="#services"
                className="inline-flex items-center border-b pb-1 text-[0.74rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "rgba(244,239,228,0.9)", borderColor: "rgba(244,239,228,0.35)" }}
              >
                What we cover
              </a>
            </div>
          </div>
        </div>

        {/* Sits ABOVE the opener, not behind it. The band a visitor sees while
            the panels are still closed is this exact element, still running in
            the same place once they have gone. Nothing is shown and taken
            away, which is what keeps the opener a surprise rather than a gate. */}
        <div className="c-band absolute inset-x-0 bottom-0 z-40 py-4">
          <Marquee
            items={band}
            seconds={52}
            textClassName="text-[0.78rem] font-semibold uppercase tracking-[0.2em]"
            gap="gap-6 pr-6"
          />
        </div>

        <BrandCurtain />
        </section>
      </div>

      {/* ════════════════════════════════════════════ 2. PROMISE ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36" id="about">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="c-eyebrow">Independent, and on your side</p>
            </Reveal>
            <Reveal delay={0.08}>
              <hr className="c-rule mt-7 w-16" style={{ borderColor: "var(--c-accent)", borderTopWidth: 2 }} />
            </Reveal>
            {/* The column was empty down to the fold, which read as a mistake
                rather than as space. The photograph is the container here, no
                frame around it. */}
            <Reveal delay={0.16}>
              <div className="relative mt-12 aspect-4/5 w-full overflow-hidden">
                <Photo
                  src="/images/about/hero.jpg"
                  alt="An advisor shaking hands with a client across a desk at the end of a meeting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div>
            <RevealLines
              className="c-display text-[clamp(1.9rem,4vw,3.4rem)]"
              lines={[
                "We do not work for",
                <span key="l2">
                  one carrier. We work{" "}
                  <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>for you.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.18}>
              <p className="mt-10 max-w-2xl text-[1.08rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                {verbatim.mission}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-6 max-w-2xl text-[1.08rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                Naureen and Aziz Ali have spent their careers on the same question: what happens
                to this family if the worst day arrives. We built the practice on trust,
                transparency, and the idea that the person who sold you the policy should still
                be answering the phone ten years later.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <p className="mt-10 text-[0.82rem] tracking-wide" style={{ color: "var(--c-ink-soft)" }}>
                Serving {areaServed.slice(0, 4).join(", ")} and the northwest suburbs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ 3. SERVICE INDEX ── HIGH ── */}
      <section className="on-tint border-y" style={{ borderColor: "var(--c-hairline)" }} id="services">
        <div className="mx-auto max-w-[1440px] px-6 pt-20 lg:px-10 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="c-display text-[clamp(2rem,4.4vw,3.6rem)]">
                Fifteen lines of business.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>One person</span> who
                knows them all.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[0.95rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                Run your eye down the list. Each one tells you who it is for.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <ServiceIndex />
        </div>
      </section>

      {/* ═══════════════════════════════════════════ 4. PROCESS ── LOW ── */}
      <section className="on-deep" id="process">
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

          {/* Hairline separated columns, not a grid of bordered cards. */}
          <ol className="mt-16 grid lg:grid-cols-3">
            {process.map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={0.1 + i * 0.09}
                className="border-t py-10 lg:border-l lg:border-t-0 lg:px-9 lg:py-0 lg:first:pl-0"
              >
                <div style={{ borderColor: "var(--c-hairline)" }}>
                  <p className="text-[0.68rem] tracking-[0.24em]" style={{ color: "var(--c-accent)" }}>
                    {step.n}
                  </p>
                  <h3 className="c-display mt-6 text-[1.6rem] leading-tight">{step.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: "var(--c-on-deep-soft)" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════════════════════ 5. THE ILLINOIS RULE ── HIGH ── */}
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
              "linear-gradient(to top, rgba(14,27,46,0.95) 0%, rgba(14,27,46,0.72) 45%, rgba(14,27,46,0.3) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
                An Illinois right most people are never told about
              </p>
            </Reveal>
            <RevealLines
              className="c-display mt-7 text-[clamp(2rem,5vw,4.2rem)]"
              lines={[
                <span key="a" style={{ color: "var(--c-on-deep)" }}>
                  You get 45 days
                </span>,
                <span key="b" style={{ color: "var(--c-on-deep)" }}>
                  every{" "}
                  <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>birthday.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: "rgba(244,239,228,0.82)" }}>
                Illinois is one of a handful of states with a Medigap birthday rule. If you are
                between 65 and 75 and you have a Medigap policy, you can switch to another plan
                with equal or lesser benefits during a 45 day window that starts on your birthday,
                with no medical underwriting and no health questions. Most agents never mention it.
                We will tell you when yours opens.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <a
                href="#answers"
                className="mt-10 inline-flex items-center border-b pb-1 text-[0.74rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--c-accent)", borderColor: "var(--c-accent)" }}
              >
                More answers like this
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ 6. ANSWERS ── LOW ── */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36" id="answers">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="c-eyebrow">Straight answers</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="c-display mt-6 text-[clamp(1.9rem,3.6vw,3rem)]">
                The questions people
                <br />
                actually{" "}
                <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>type in.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--c-hairline)" }}>
                <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {factsSource.asOf}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {factsSource.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        className="text-[0.8rem] underline underline-offset-4 hover:opacity-70"
                        style={{ color: "var(--c-accent-deep)" }}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ConceptFaqs items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════ 7. BOOK ── HIGH ── */}
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
          </div>

          <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-24">
            <Reveal>
              <p className="c-eyebrow">No cost, no obligation</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="c-display mt-6 text-[clamp(2rem,4vw,3.4rem)]">
                Twenty minutes.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>Nothing sold.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                Tell us what you have and what worries you. If we cannot improve on it, we will
                say so and you will have lost twenty minutes.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--c-deep)", color: "var(--c-on-deep)" }}
                >
                  Call {contact.phone}
                </a>
                <span className="text-[0.9rem]" style={{ color: "var(--c-ink-soft)" }}>
                  or book online
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConceptFooter concept="broadsheet" />
    </div>
  );
}

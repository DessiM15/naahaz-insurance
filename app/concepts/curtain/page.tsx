import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/concepts/HeroVideo";
import { Words, WordNodes } from "@/components/concepts/Words";
import { Curtain, Marquee } from "@/components/concepts/Curtain";
import { ConceptHeader, ConceptFooter, ConceptFaqs } from "@/components/concepts/Chrome";
import { faqs, factsSource, process, services, areaServed, contact, verbatim } from "@/content/concepts";

export const metadata: Metadata = { title: "The Curtain" };

/** The four chapters. Each pairs a plain-language question with a line of business. */
const chapters = [
  {
    n: "01",
    q: "If your income stopped tomorrow",
    a: "Life and disability",
    body: "A mortgage does not pause because a paycheck did. We size the cover to the years your family would actually need carrying, not to a round number that sounds reassuring.",
    slug: "life-insurance",
  },
  {
    n: "02",
    q: "When you stop working",
    a: "Retirement and income",
    body: "The hard part is not saving. It is turning what you saved into a paycheck that lasts, in an order that keeps the tax bill down.",
    slug: "retirement-planning",
  },
  {
    n: "03",
    q: "Turning 65, or already there",
    a: "Medicare",
    body: "Advantage, Supplement and Part D compared side by side, including the Illinois rules almost nobody explains. No cost to you.",
    slug: "medicare",
  },
  {
    n: "04",
    q: "If care is needed later",
    a: "Long term care",
    body: "Medicare pays for far less of this than people assume. Planning early is the difference between a plan and a fire sale.",
    slug: "long-term-care",
  },
] as const;

const band = [
  "Retirement",
  "Life",
  "Medicare",
  "Long term care",
  "Health",
  "Business",
  "Home and auto",
  "Disability",
] as const;

/**
 * CONCEPT THREE: THE CURTAIN
 *
 * Cool paper against full brand navy. The cinematic one.
 *
 * Everything the client liked in the reference site his advisor rated A, done
 * without gating anything: a curtain that opens on the hero, headlines that
 * arrive word by word, a moving band, and numbered chapters down the page.
 * This is also the montage hero, so it can be judged against the single
 * continuous shot the other three concepts use.
 *
 *   1 hero, curtain, four cut montage            HIGH   video
 *   2 moving band and the promise                LOW    paper
 *   3 four chapters                              HIGH   alternating photo
 *   4 the method                                 LOW    deep navy
 *   5 the Illinois rule                          HIGH   photo
 *   6 answers                                    LOW    tint
 *   7 book                                       HIGH   deep navy and photo
 */
export default function CurtainConcept() {
  return (
    <div data-concept="curtain">
      <ConceptHeader concept="curtain" />

      {/* ═══════════════════════════════════════════════ 1. HERO ── HIGH ── */}
      {/* The hero is pinned inside a taller track. That extra height is the
          travel the panels part across, which is what makes the opener scroll
          driven. Collapses to one viewport when the opener is skipped. */}
      <div data-cc-track className="c-cc-track relative">
        <section className="sticky top-0 isolate flex h-svh items-center justify-center overflow-hidden">
        <HeroVideo
          src="/video/hero-montage.mp4"
          poster="/video/poster-montage.jpg"
          alt="A family walking at sunset, a couple walking hand in hand, a family together at dusk, and a person sitting alone beneath a tree at the end of the day"
          overlayClassName="bg-[linear-gradient(to_top,rgba(10,22,40,0.9)_0%,rgba(10,22,40,0.5)_45%,rgba(10,22,40,0.35)_100%)]"
        />
        <Curtain />

        <div className="relative z-40 mx-auto w-full max-w-[1440px] px-6 text-center lg:px-10">
          <p
            className="c-in c-eyebrow"
            style={{ color: "var(--c-accent)", ["--wd" as string]: "0.9s" }}
          >
            Rolling Meadows, Illinois
          </p>

          <WordNodes
            as="h1"
            start={1.05}
            step={0.075}
            className="c-display mx-auto mt-7 max-w-[16ch] text-[clamp(2.8rem,8vw,7rem)]"
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

          <p
            className="c-in mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed"
            style={{ color: "rgba(244,246,250,0.82)", ["--wd" as string]: "1.4s" }}
          >
            {verbatim.heroSub}.
          </p>

          <div
            className="c-in mt-10 flex flex-wrap items-center justify-center gap-5"
            style={{ ["--wd" as string]: "1.55s" }}
          >
            <a
              href="#book"
              className="inline-flex items-center px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--c-accent)", color: "#0a1628" }}
            >
              Book a call
            </a>
            <a
              href="#chapters"
              className="inline-flex items-center border-b pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(244,246,250,0.9)", borderColor: "rgba(244,246,250,0.35)" }}
            >
              Where do I start
            </a>
          </div>
        </div>

        <p
          className="c-in absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-[0.62rem] tracking-[0.32em]"
          style={{ color: "rgba(244,246,250,0.55)", ["--wd" as string]: "2s" }}
        >
          SCROLL
        </p>
        </section>
      </div>

      {/* ══════════════════════════════════ 2. BAND AND PROMISE ── LOW ── */}
      <section className="py-24 lg:py-32" id="about">
        <div style={{ color: "var(--c-ink-soft)", opacity: 0.55 }}>
          <Marquee items={band} seconds={44} />
        </div>

        <div className="mx-auto mt-20 max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="c-eyebrow">Independent since day one</p>
              </Reveal>
            </div>
            <div>
              <RevealLines
                className="c-display text-[clamp(1.9rem,4.2vw,3.5rem)]"
                lines={[
                  "No carrier writes",
                  <span key="b">
                    our paycheck, so no carrier
                  </span>,
                  <span key="c">
                    writes our{" "}
                    <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>advice.</span>
                  </span>,
                ]}
              />
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-2xl text-[1.06rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                  {verbatim.mission}
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-8 text-[0.82rem] tracking-[0.1em]" style={{ color: "var(--c-ink-soft)" }}>
                  {areaServed.join(" · ")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ 3. CHAPTERS ── HIGH ── */}
      <section id="chapters" className="on-tint">
        <div className="mx-auto max-w-[1440px] px-6 pt-20 lg:px-10 lg:pt-24">
          <Reveal>
            <h2 className="c-display max-w-[20ch] text-[clamp(2rem,4.4vw,3.5rem)]">
              Most people arrive with a worry,
              <br />
              not a{" "}
              <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>product name.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          {chapters.map((c, i) => (
            <article
              key={c.n}
              className={`grid items-stretch lg:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}
            >
              <div className={`relative min-h-[20rem] lg:min-h-[32rem] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Photo
                  src={services.find((s) => s.slug === c.slug)?.image ?? "/images/services/hub.jpg"}
                  alt={services.find((s) => s.slug === c.slug)?.alt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div
                className={`flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-20 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
                style={{ background: i % 2 === 1 ? "var(--c-card)" : "transparent" }}
              >
                <Reveal>
                  <p className="text-[0.68rem] tracking-[0.28em]" style={{ color: "var(--c-accent-deep)" }}>
                    CHAPTER {c.n}
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h3 className="c-display mt-6 text-[clamp(1.8rem,3.4vw,2.9rem)]">{c.q}</h3>
                </Reveal>
                <Reveal delay={0.14}>
                  <p
                    className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--c-ink-soft)" }}
                  >
                    {c.a}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                    {c.body}
                  </p>
                </Reveal>
                <Reveal delay={0.28}>
                  <a
                    href="#book"
                    className="mt-9 inline-flex items-center border-b pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--c-accent-deep)", borderColor: "var(--c-accent-deep)" }}
                  >
                    Talk it through
                  </a>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════ 4. METHOD ── LOW ── */}
      <section className="on-deep" id="process">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal>
            <Words
              as="h2"
              text="Three steps, and none of them is a sales pitch."
              step={0.035}
              className="c-display max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.4rem)]"
            />
          </Reveal>

          <ol className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-16">
            {process.map((step, i) => (
              <Reveal key={step.n} as="li" delay={0.08 + i * 0.08}>
                <div className="border-t pt-7" style={{ borderColor: "var(--c-hairline)" }}>
                  <p className="text-[0.68rem] tracking-[0.28em]" style={{ color: "var(--c-accent)" }}>
                    {step.n}
                  </p>
                  <h3 className="c-display mt-6 text-[1.55rem] leading-tight">{step.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: "var(--c-on-deep-soft)" }}>
                    {step.body}
                  </p>
                </div>
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
              "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 48%, rgba(10,22,40,0.25) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal>
            <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              The thing nobody tells Illinois retirees
            </p>
          </Reveal>
          <RevealLines
            className="c-display mt-7 max-w-[16ch] text-[clamp(2.1rem,5.4vw,4.6rem)]"
            lines={[
              <span key="a" style={{ color: "var(--c-on-deep)" }}>
                Your birthday
              </span>,
              <span key="b" style={{ color: "var(--c-on-deep)" }}>
                opens a{" "}
                <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>door.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.22}>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: "rgba(244,246,250,0.82)" }}>
              Illinois has a Medigap birthday rule. If you are 65 to 75 with a Medigap policy, a
              45 day window opens on your birthday in which you can move to another plan with
              equal or lesser benefits, with no health questions and no underwriting. Most states
              have nothing like it. We keep track of when yours opens.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════ 6. ANSWERS ── LOW ── */}
      <section className="on-tint" id="answers">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="c-display text-[clamp(1.9rem,3.6vw,3rem)]">
                  Straight
                  <br />
                  <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>answers.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-9 border-t pt-6" style={{ borderColor: "var(--c-hairline)" }}>
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
            <Reveal delay={0.1}>
              <ConceptFaqs items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ 7. BOOK ── HIGH ── */}
      <section className="relative isolate overflow-hidden" id="book">
        <Photo
          src="/images/sections/cta.jpg"
          alt="An advisor and a client shaking hands at the end of a meeting"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.86) 45%, rgba(10,22,40,0.4) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-36">
          <div className="max-w-2xl">
            <Reveal>
              <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
                No cost, no obligation
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="c-display mt-7 text-[clamp(2.1rem,4.6vw,3.8rem)]" style={{ color: "var(--c-on-deep)" }}>
                Twenty minutes.
                <br />
                <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>Nothing sold.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-lg text-[1.04rem] leading-relaxed" style={{ color: "rgba(244,246,250,0.8)" }}>
                Bring what you already have. If we cannot improve on it, we will tell you so.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-11 flex flex-wrap items-center gap-6">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--c-accent)", color: "#0a1628" }}
                >
                  Call {contact.phone}
                </a>
                <address className="not-italic text-[0.92rem] leading-relaxed" style={{ color: "rgba(244,246,250,0.7)" }}>
                  {contact.street}
                  <br />
                  {contact.city}, {contact.region} {contact.postal}
                </address>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConceptFooter concept="curtain" />
    </div>
  );
}

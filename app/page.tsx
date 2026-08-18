import { Photo } from "@/components/media/Photo";
import { Duotone } from "@/components/media/Duotone";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadSection } from "@/components/sections/LeadSection";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { clientCopy } from "@/content/copy";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------- Mission */}
      <section className="container-content py-32" aria-labelledby="mission-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>About NAAHAZ Inc.</Eyebrow>
            </Reveal>
            <RevealLines
              id="mission-heading"
              className="mt-7 text-h2 font-semibold text-ink-50"
              lines={["Independent, and", <>on <span className="accent-word">your side</span></>]}
            />
            <Reveal delay={0.16}>
              <div className="relative mt-12 hidden aspect-4/5 overflow-hidden rounded-3xl border border-navy-700 lg:block">
                <Duotone
                  src="/images/sections/mission.jpg"
                  alt="An older adult and a child walking together along a path"
                  sizes="(max-width: 1024px) 0px, 40vw"
                  intensity={0.9}
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:pt-3">
            <Reveal delay={0.1}>
              <p className="text-lead text-ink-200">{clientCopy.mission}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-ink-300">{clientCopy.whyChooseUs}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-7 text-ink-300">
                We built this practice on {clientCopy.values} — and on the idea that
                the person selling you coverage should still be answering the phone
                ten years later.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-10">
                <ButtonLink href="/about" variant="ghost" arrow>
                  Our story
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <Process />

      {/* ------------------------------------------------------ Testimonials */}
      <section className="grain relative overflow-hidden py-32" aria-labelledby="voices-heading">
        <Photo
          src="/images/sections/testimonial.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950/90 to-navy-900" aria-hidden />
        <div className="grain-layer" aria-hidden />

        <div className="container-content relative">
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
            <h2 id="voices-heading" className="mt-7 max-w-2xl text-h2 font-semibold text-ink-50">
              What clients <span className="accent-word">say</span>
            </h2>
          </Reveal>

          {/*
            TODO(client): real testimonials needed. The component is built and
            ready — we deliberately ship an honest empty state rather than
            invented quotes, which would be both misleading and, for a
            regulated financial practice, a genuine liability.
          */}
          <Reveal delay={0.12}>
            <div className="mt-14 rounded-3xl border border-dashed border-navy-600 bg-navy-800/40 p-12 text-center">
              <p className="mx-auto max-w-lg text-ink-300">
                This section is built and waiting on real client testimonials.
                Rather than fill it with invented quotes, we&rsquo;ve left it honest —
                send us three or four and they&rsquo;ll drop straight in, with{" "}
                <span className="text-ink-50">Review</span> schema for rich results.
              </p>
              <p className="mt-5 text-[0.85rem] text-ink-500">
                Google reviews work perfectly here too.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <LeadSection source="home" />
      <CtaBand />
    </>
  );
}

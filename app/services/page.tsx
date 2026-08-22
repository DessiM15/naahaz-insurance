import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import Link from "next/link";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadSection } from "@/components/sections/LeadSection";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BreadcrumbSchema } from "@/components/Schema";
import { ADDITIONAL_LINES } from "@/content/services";
import { clientCopy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Insurance & Financial Services",
  description:
    "Retirement planning, Medicare, life insurance, long term care, health insurance, business coverage and more — tailored solutions from NAAHAZ INSURANCE in Rolling Meadows, IL.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="bs-paper">
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />

      {/* Hub hero */}
      <section className="grain relative flex min-h-[62svh] items-end overflow-hidden pb-20 pt-40">
        <Photo
          src="/images/services/hub.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2e] via-[#0e1b2e]/80 to-[#0e1b2e]/40" aria-hidden />
        <div className="grain-layer" aria-hidden />

        <div className="container-content relative">
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
          </Reveal>
          <RevealLines
            as="h1"
            className="mt-8 max-w-4xl text-h1 font-semibold text-ink-50"
            lines={["Everything we do,", <>in <span className="accent-word">one place</span></>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lead text-ink-300">{clientCopy.mission}</p>
          </Reveal>
        </div>
      </section>

      <ServicesGrid heading={false} />

      {/* Additional lines */}
      <section className="container-content pb-8" aria-labelledby="also-heading">
        <Reveal>
          <div className="rule-paper pt-10">
            <h2 id="also-heading" className="text-h3 font-semibold text-slate-700">
              We also handle
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              These sit within the pages above — follow the link and you&rsquo;ll land in
              the right place.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ADDITIONAL_LINES.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center border border-paper-300 px-5 text-[0.85rem] text-slate-700 transition-all duration-300 hover:border-gold-600 hover:bg-paper-200"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Band — a breath between the catalogue and the resources */}
      <section className="grain relative mt-20 overflow-hidden py-28" aria-labelledby="band-heading">
        <Photo
          src="/images/sections/hub-band.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1b2e] via-[#0e1b2e]/85 to-[#0e1b2e]/45" aria-hidden />
        <div className="grain-layer" aria-hidden />

        <div className="container-content relative">
          <Reveal>
            <h2 id="band-heading" className="max-w-2xl text-h2 font-semibold text-ink-50">
              One agency for all of it &mdash; and{" "}
              <span className="accent-word">one person</span> who knows the whole picture
            </h2>
            <p className="mt-7 max-w-xl text-lead text-ink-300">
              Most people end up with coverage scattered across four companies and
              nobody looking at how the pieces fit. That&rsquo;s where the gaps live.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Resources — where the legacy /videos page now lives */}
      <section id="resources" className="container-content py-24" aria-labelledby="resources-heading">
        <Reveal>
          <Eyebrow surface="paper">Resources</Eyebrow>
          <h2 id="resources-heading" className="mt-7 text-h2 font-semibold text-slate-700">
            Videos &amp; <span className="accent-word-paper">guides</span>
          </h2>
          <p className="mt-6 max-w-2xl text-slate-700/85">
            Short explainers on the topics people ask about most.
          </p>
        </Reveal>

        {/*
          TODO(client): the legacy /videos page 301s here. Supply the video
          URLs and they drop into this grid as lazy-loaded embeds with poster
          frames — no third-party player script until someone hits play.
        */}
        <Reveal delay={0.12}>
          <div className="mt-10 border border-dashed border-paper-300 bg-paper-200/60 p-12 text-center">
            <p className="mx-auto max-w-lg text-slate-500">
              Video grid is built and waiting on the embed URLs from the existing{" "}
              <span className="text-slate-700">/videos</span> page.
            </p>
          </div>
        </Reveal>
      </section>

      <LeadSection source="services-hub" surface="paper" />
      <CtaBand />
    </div>
  );
}

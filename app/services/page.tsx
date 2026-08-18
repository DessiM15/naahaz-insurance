import type { Metadata } from "next";
import Image from "next/image";
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
    <>
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />

      {/* Hub hero */}
      <section className="grain relative flex min-h-[62svh] items-end overflow-hidden pb-20 pt-40">
        <Image
          src="/images/services/hub.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" aria-hidden />
        <div className="mesh-drift absolute inset-0 opacity-50" aria-hidden />
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
          <div className="rule-hairline pt-10">
            <h2 id="also-heading" className="text-h3 font-semibold text-ink-50">
              We also handle
            </h2>
            <p className="mt-3 max-w-2xl text-ink-500">
              These sit within the pages above — follow the link and you&rsquo;ll land in
              the right place.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {ADDITIONAL_LINES.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center rounded-full border border-navy-600 px-5 text-[0.9rem] text-ink-300 transition-all duration-300 hover:border-gold-500/60 hover:text-gold-400"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Resources — where the legacy /videos page now lives */}
      <section id="resources" className="container-content py-24" aria-labelledby="resources-heading">
        <Reveal>
          <Eyebrow>Resources</Eyebrow>
          <h2 id="resources-heading" className="mt-7 text-h2 font-semibold text-ink-50">
            Videos &amp; <span className="accent-word">guides</span>
          </h2>
          <p className="mt-6 max-w-2xl text-ink-300">
            Short explainers on the topics people ask about most.
          </p>
        </Reveal>

        {/*
          TODO(client): the legacy /videos page 301s here. Supply the video
          URLs and they drop into this grid as lazy-loaded embeds with poster
          frames — no third-party player script until someone hits play.
        */}
        <Reveal delay={0.12}>
          <div className="mt-10 rounded-3xl border border-dashed border-navy-600 bg-navy-800/40 p-12 text-center">
            <p className="mx-auto max-w-lg text-ink-300">
              Video grid is built and waiting on the embed URLs from the existing{" "}
              <span className="text-ink-50">/videos</span> page.
            </p>
          </div>
        </Reveal>
      </section>

      <LeadSection source="services-hub" />
      <CtaBand />
    </>
  );
}

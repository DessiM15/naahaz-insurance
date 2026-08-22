import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/content/services";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { accentize } from "@/components/ui/Headline";
import { Faqs } from "@/components/sections/Faqs";
import { LeadSection } from "@/components/sections/LeadSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { MedicareDisclaimer } from "@/components/sections/MedicareDisclaimer";
import { BreadcrumbSchema, FaqSchema } from "@/components/Schema";
import { Duotone } from "@/components/media/Duotone";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.lede.slice(0, 158),
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | NAAHAZ INSURANCE`,
      description: service.lede.slice(0, 158),
      url: `/services/${service.slug}`,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
      <FaqSchema faqs={service.faqs} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="grain relative flex min-h-[72svh] items-end overflow-hidden pb-24 pt-40">
        <Duotone src={service.image} alt={service.imageAlt} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2e] via-[#0e1b2e]/78 to-[#0e1b2e]/35" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1b2e]/80 to-transparent" aria-hidden />

        <div className="container-content relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[0.85rem] text-ink-500">
                <li><Link href="/" className="inline-link hover:text-gold-400">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/services" className="inline-link hover:text-gold-400">Services</Link></li>
                <li aria-hidden>/</li>
                <li className="text-ink-300">{service.short}</li>
              </ol>
            </nav>
            <Eyebrow>{service.eyebrow}</Eyebrow>
          </Reveal>

          <RevealLines
            as="h1"
            className="mt-8 max-w-4xl text-h1 font-semibold text-ink-50"
            lines={[accentize(service.headline)]}
          />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lead text-ink-300">{service.lede}</p>
          </Reveal>
        </div>
      </section>

      {/*
        Everything from here to the CTA is the reading run, on paper.
        Navy hero, paper body, navy close — dark bookends around the part
        people actually read. Light-on-dark is measurably harder for extended
        reading, and it is hardest for exactly the 50-70 audience this page
        is written for.
      */}
      <div className="bs-paper">
      {/* ----------------------------------------------------------- Intro */}
      <section className="container-content py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-h3 font-semibold text-slate-700">The short version</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lead text-slate-700/90">{service.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Offerings */}
      <section className="container-content pb-28" aria-labelledby="offerings-heading">
        <Reveal>
          <Eyebrow surface="paper">What&rsquo;s included</Eyebrow>
          <h2 id="offerings-heading" className="mt-7 max-w-2xl text-h2 font-semibold text-slate-700">
            How we <span className="accent-word-paper">help</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {service.offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 2) * 0.08}>
              <div className="rule-paper pt-6">
                <h3 className="text-h3 font-semibold text-slate-700">{o.title}</h3>
                <p className="mt-4 text-slate-700/85">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Who for */}
      <section className="grain relative overflow-hidden py-28" aria-labelledby="whofor-heading">
        <div className="absolute inset-0 bg-paper-200/70" aria-hidden />
        <div className="grain-layer" aria-hidden />
        <div className="container-content relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow surface="paper">Is this you?</Eyebrow>
              <h2 id="whofor-heading" className="mt-7 text-h2 font-semibold text-slate-700">
                Worth a <span className="accent-word-paper">conversation</span> if
              </h2>
            </Reveal>

            <ul className="mt-10 space-y-5">
              {service.whoFor.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden>
                      <path d="M4 12.5l5 5L20 7" stroke="var(--color-gold-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-lead text-slate-700/90">{w}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.14}>
            <div className="relative aspect-4/5 overflow-hidden border border-paper-300 sm:aspect-4/3 lg:aspect-4/5">
              <Duotone
                src={service.detailImage}
                alt={service.detailAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                intensity={0.85}
                surface="paper"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Faqs faqs={service.faqs} surface="paper" />

      {service.medicareDisclaimer && <MedicareDisclaimer surface="paper" />}

      {/* --------------------------------------------------------- Related */}
      <section className="container-content py-20" aria-labelledby="related-heading">
        <Reveal>
          <h2 id="related-heading" className="text-h3 font-semibold text-slate-700">
            Often looked at alongside
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.07}>
              <Link
                href={`/services/${r.slug}`}
                className="group relative flex min-h-40 flex-col justify-end overflow-hidden border border-paper-300 p-6 transition-colors duration-500 hover:border-gold-600/60"
              >
                <Photo
                  src={r.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2e]/92 via-[#0e1b2e]/55 to-[#0e1b2e]/20" aria-hidden />
                <span className="relative font-medium text-ink-50">{r.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadSection
        surface="paper"
        defaultInterest={service.slug}
        source={`service:${service.slug}`}
        eyebrow={service.short}
        heading={<>Let&rsquo;s talk about <span className="accent-word-paper">{service.short.toLowerCase()}</span></>}
        body="Tell us where you are and we'll come back with something useful. The first conversation is free and there's no obligation attached to it."
      />
      </div>

      <CtaBand />
    </>
  );
}

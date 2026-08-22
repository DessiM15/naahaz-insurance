import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import Link from "next/link";
import { POSTS, formatDate } from "@/lib/blog";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "News & Resources",
  description:
    "Plain-English guidance on Medicare, retirement planning, disability income and protecting what you've built — from NAAHAZ INSURANCE.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const [lead, ...rest] = POSTS;

  return (
    <div className="bs-paper">
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "News & Resources", href: "/blog" }]} />

      <section className="container-content pb-16 pt-40">
        <Reveal>
          <Eyebrow surface="paper">News &amp; Press</Eyebrow>
        </Reveal>
        <RevealLines
            as="h1"
          className="mt-8 max-w-3xl text-h1 font-semibold text-slate-700"
          lines={["Straight answers,", <>no <span className="accent-word-paper">jargon</span></>]}
        />
        <Reveal delay={0.18}>
          <p className="mt-8 max-w-2xl text-lead text-slate-700/85">
            The questions clients ask us most, written out properly.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="relative mt-14 aspect-21/9 overflow-hidden border border-paper-300">
            <Photo
              src="/images/blog/index-hero.jpg"
              alt="A notebook and laptop on a quiet desk"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/35 mix-blend-multiply" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" aria-hidden />
          </div>
        </Reveal>
      </section>

      {/* Lead post */}
      {lead && (
        <section className="container-content pb-6">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group relative grid overflow-hidden border border-paper-300 bg-paper-100 transition-colors duration-500 hover:border-gold-600/60 lg:grid-cols-2"
            >
              <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-80">
                <Photo
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy-900/25 mix-blend-multiply" aria-hidden />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="flex items-center gap-3 text-[0.8rem]">
                  <span className="border border-paper-300 bg-paper-200 px-3 py-1 uppercase tracking-[0.14em] text-slate-700">{lead.tag}</span>
                  <time dateTime={lead.published} className="text-slate-500">
                    {formatDate(lead.published)}
                  </time>
                </div>
                <h2 className="mt-6 text-h2 font-semibold text-slate-700">{lead.title}</h2>
                <p className="mt-5 text-slate-700/85">{lead.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Read the article
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-400 group-hover:translate-x-1">
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Rest */}
      <section className="container-content pb-24">
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-paper-300 bg-paper-100 transition-colors duration-500 hover:border-gold-600/60"
              >
                <div className="relative aspect-16/9">
                  <Photo
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-900/30 mix-blend-multiply" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-[0.78rem]">
                    <span className="border border-paper-300 bg-paper-200 px-3 py-1 uppercase tracking-[0.14em] text-slate-700">{p.tag}</span>
                    <time dateTime={p.published} className="text-slate-500">
                      {formatDate(p.published)}
                    </time>
                  </div>
                  <h2 className="mt-5 text-h3 font-semibold text-slate-700">{p.title}</h2>
                  <p className="mt-4 flex-1 text-[0.95rem] text-slate-700/85">{p.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* TODO(client): migrate any further posts from the legacy /blog. */}
      </section>

      <CtaBand />
    </div>
  );
}

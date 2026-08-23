import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { POSTS, formatDate, readingTime, toCard } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "News & Resources",
  description:
    "Plain-English guidance on Medicare, retirement planning, disability income and protecting what you've built — from NAAHAZ INSURANCE.",
  alternates: { canonical: "/blog" },
};

/**
 * The section front.
 *
 * Masthead, then the lead article at full width, then the archive as a dated
 * list with topic filtering. The lead gets a different treatment from the
 * rest on purpose — three identical cards told a reader nothing about what to
 * read first.
 */
export default function BlogIndex() {
  const [lead, ...rest] = POSTS;

  return (
    <div className="bs-paper">
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "News & Resources", href: "/blog" }]} />

      <PageMasthead
        eyebrow="News & Press"
        title="Straight answers, no {jargon}"
        lede="The questions clients ask us most, written out properly — Medicare, retirement, disability income, and what actually happens when you need to claim."
      />

      {/* ═══════════════════════════════════════════ THE LEAD ── HIGH ── */}
      {lead && (
        <section className="on-tint border-b" style={{ borderColor: "var(--c-hairline)" }} aria-labelledby="lead-heading">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
            <Reveal>
              <Link href={`/blog/${lead.slug}`} className="group block">
                <div className="relative aspect-16/9 overflow-hidden lg:aspect-21/9">
                  <Photo
                    src={lead.image}
                    alt={lead.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
                  <div>
                    <div className="bs-label flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span style={{ color: "var(--c-accent-deep)" }}>The lead</span>
                      <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                      <span>{lead.tag}</span>
                      <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                      <time dateTime={lead.published}>{formatDate(lead.published)}</time>
                      <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                      <span>{readingTime(lead.words)} min read</span>
                    </div>

                    <h2
                      id="lead-heading"
                      className="c-display mt-5 text-[clamp(1.9rem,4.2vw,3.4rem)]"
                    >
                      {lead.title}
                    </h2>
                  </div>

                  <div className="lg:pt-14">
                    <p className="text-[1.05rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                      {lead.description}
                    </p>
                    <span
                      className="mt-7 inline-flex items-center gap-2 border-b pb-1 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "var(--c-ink)", borderColor: "var(--c-accent)" }}
                    >
                      Read the article
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════ ARCHIVE ── LOW ── */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28" aria-labelledby="archive-heading">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="c-eyebrow">The archive</p>
            <h2 id="archive-heading" className="c-display mt-5 text-[clamp(1.6rem,2.8vw,2.2rem)]">
              Everything else
              <br />
              we&rsquo;ve written
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
              {POSTS.length} article{POSTS.length === 1 ? "" : "s"}. Filter by topic, or read
              the lot — none of them take longer than a coffee.
            </p>
          </div>

          {/* Tags come from the archived posts, not from every post. The lead
              is not in this list, so offering its topic as a filter would give
              a chip that always returns nothing. */}
          <BlogArchive posts={rest.map(toCard)} tags={[...new Set(rest.map((p) => p.tag))]} />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

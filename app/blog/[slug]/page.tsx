import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, formatDate, readingTime } from "@/lib/blog";
import { getService } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/Schema";
import { disclaimers } from "@/content/copy";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await post.load();
  const service = getService(post.service);
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <div className="bs-paper">
      <BreadcrumbSchema
        trail={[
          { name: "Home", href: "/" },
          { name: "News & Resources", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.description}
        slug={post.slug}
        published={post.published}
        image={post.image}
      />

      <article>
        {/* Header. Centred to match the section fronts, but the body below
            stays a single measured column — centred body copy is unreadable. */}
        <header className="bs-masthead pb-14 pt-36 text-center lg:pt-44">
          <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="bs-label flex items-center justify-center gap-2">
                <li><Link href="/" className="inline-link hover:opacity-70">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blog" className="inline-link hover:opacity-70">News &amp; Resources</Link></li>
              </ol>
            </nav>

            <div className="mx-auto max-w-4xl">
              <div
                className="bs-masthead-rule c-in mx-auto w-40"
                style={{ ["--wd" as string]: "0.05s" }}
                aria-hidden
              />

              <p className="c-in c-eyebrow mt-8" style={{ ["--wd" as string]: "0.14s" }}>
                {post.tag}
              </p>

              <h1
                className="bs-masthead-title c-in mt-7"
                style={{ ["--wd" as string]: "0.24s" }}
              >
                {post.title}
              </h1>

              <p
                className="bs-label c-in mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
                style={{ ["--wd" as string]: "0.4s" }}
              >
                <time dateTime={post.published}>{formatDate(post.published)}</time>
                <span aria-hidden style={{ color: "var(--c-hairline)" }}>|</span>
                <span>{readingTime(post.words)} min read</span>
              </p>
            </div>
          </div>
        </header>

        {/* Cover */}
        <Reveal>
          <div className="container-content">
            <div className="relative mt-14 aspect-21/9 overflow-hidden border border-paper-300">
              <Photo
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/25 mix-blend-multiply" aria-hidden />
            </div>
          </div>
        </Reveal>

        {/* Body */}
        <div className="container-content">
          <div className="bs-dropcap mx-auto max-w-2xl py-20 text-lg">
            <Content />

            <div className="rule-paper mt-16 pt-8">
              <p className="text-[0.8rem] leading-relaxed text-slate-500">{disclaimers.advice}</p>
            </div>

            {service && (
              <div className="mt-12 border border-paper-300 bg-paper-100 p-8">
                <p className="text-eyebrow uppercase tracking-[0.18em] text-slate-500">Related service</p>
                <h2 className="mt-4 text-h3 font-semibold text-slate-700">{service.name}</h2>
                <p className="mt-3 text-slate-700/85">{service.lede}</p>
                <div className="mt-7">
                  <ButtonLink href={`/services/${service.slug}`} variant="ghost-paper" arrow>
                    Learn more
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* More */}
      <section className="container-content pb-20" aria-labelledby="more-heading">
        <div className="flex items-baseline gap-4">
          <span className="bs-numeral">&mdash;</span>
          <h2 id="more-heading" className="c-display text-[clamp(1.5rem,2.6vw,2.1rem)]">Keep reading</h2>
        </div>
        <hr className="c-rule mt-6" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex gap-5 border border-paper-300 bg-paper-100 p-5 transition-colors duration-500 hover:border-gold-600/60"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden">
                  <Photo src={p.image} alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">{p.tag}</span>
                  <h3 className="mt-1.5 font-medium text-slate-700">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

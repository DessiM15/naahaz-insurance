import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, formatDate } from "@/lib/blog";
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
    <>
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
        {/* Header */}
        <header className="container-content pb-12 pt-40">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[0.85rem] text-ink-500">
                <li><Link href="/" className="inline-link hover:text-gold-400">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blog" className="inline-link hover:text-gold-400">News &amp; Resources</Link></li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 text-[0.82rem]">
              <span className="rounded-full bg-gold-500/12 px-3 py-1 text-gold-400">{post.tag}</span>
              <time dateTime={post.published} className="text-ink-500">
                {formatDate(post.published)}
              </time>
            </div>

            <h1 className="mt-7 max-w-4xl text-h1 font-semibold text-ink-50">{post.title}</h1>
            <p className="mt-7 max-w-2xl text-lead text-ink-300">{post.description}</p>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal>
          <div className="container-content">
            <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-navy-700">
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
          <div className="mx-auto max-w-2xl py-20 text-lg">
            <Content />

            <div className="rule-hairline mt-16 pt-8">
              <p className="text-[0.8rem] leading-relaxed text-ink-500">{disclaimers.advice}</p>
            </div>

            {service && (
              <div className="mt-12 rounded-2xl border border-navy-700 bg-navy-800/50 p-8">
                <p className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Related service</p>
                <h2 className="mt-4 text-h3 font-semibold text-ink-50">{service.name}</h2>
                <p className="mt-3 text-ink-300">{service.lede}</p>
                <div className="mt-7">
                  <ButtonLink href={`/services/${service.slug}`} variant="ghost" arrow>
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
        <h2 id="more-heading" className="text-h3 font-semibold text-ink-50">Keep reading</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex gap-5 rounded-2xl border border-navy-700 p-5 transition-colors duration-500 hover:border-gold-500/50"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <Photo src={p.image} alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div>
                  <span className="text-[0.75rem] text-gold-400">{p.tag}</span>
                  <h3 className="mt-1.5 font-medium text-ink-50">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

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
        {/* Header */}
        <header className="container-content pb-12 pt-40">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[0.85rem] text-slate-500">
                <li><Link href="/" className="inline-link underline decoration-gold-600/40 underline-offset-4 hover:decoration-gold-600">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blog" className="inline-link underline decoration-gold-600/40 underline-offset-4 hover:decoration-gold-600">News &amp; Resources</Link></li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 text-[0.82rem]">
              <span className="border border-paper-300 bg-paper-200 px-3 py-1 uppercase tracking-[0.14em] text-slate-700">{post.tag}</span>
              <time dateTime={post.published} className="text-slate-500">
                {formatDate(post.published)}
              </time>
            </div>

            <h1 className="mt-7 max-w-4xl text-h1 font-semibold text-slate-700">{post.title}</h1>
            <p className="mt-7 max-w-2xl text-lead text-slate-700/85">{post.description}</p>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal>
          <div className="container-content">
            <div className="relative aspect-21/9 overflow-hidden border border-paper-300">
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
        <h2 id="more-heading" className="text-h3 font-semibold text-slate-700">Keep reading</h2>
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

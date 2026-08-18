import type { Metadata } from "next";
import { Duotone } from "@/components/media/Duotone";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SERVICES_SORTED } from "@/content/services";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Worth building properly rather than leaving as the framework default: the
 * legacy site had 21 URLs and people will arrive on old links from search
 * results, printed material and email signatures for years. Anything the 301
 * map doesn't catch lands here, so it should offer a route onward rather than
 * a dead end.
 */
export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <Duotone
        src="/images/sections/not-found.jpg"
        alt=""
        sizes="100vw"
        intensity={1}
        className="opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/60" aria-hidden />
      <div className="mesh-drift absolute inset-0 opacity-40" aria-hidden />

      <div className="container-content relative">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-8 max-w-3xl text-h1 font-semibold text-ink-50">
          We can&rsquo;t find that <span className="accent-word">page</span>
        </h1>
        <p className="mt-8 max-w-xl text-lead text-ink-300">
          It may have moved when we rebuilt the site. Here&rsquo;s where most people
          are heading &mdash; or call us on{" "}
          <a
            href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
            className="inline-link text-gold-400 underline decoration-gold-500/40 underline-offset-4"
          >
            {site.contact.phonePrimary}
          </a>{" "}
          and we&rsquo;ll point you the right way.
        </p>

        <div className="mt-11 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Browse all services
          </ButtonLink>
        </div>

        <ul className="mt-14 flex flex-wrap gap-2.5">
          {SERVICES_SORTED.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center rounded-full border border-navy-600 bg-navy-900/40 px-5 text-[0.88rem] text-ink-300 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/60 hover:text-gold-400"
              >
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

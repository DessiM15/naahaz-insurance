import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SERVICES_SORTED } from "@/content/services";

export function ServicesGrid({
  heading = true,
  limit,
}: {
  heading?: boolean;
  limit?: number;
}) {
  const items = limit ? SERVICES_SORTED.slice(0, limit) : SERVICES_SORTED;

  return (
    <section className="container-content py-32" aria-labelledby="services-heading">
      {heading && (
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <RevealLines
            id="services-heading"
            className="mt-7 text-h2 font-semibold text-ink-50"
            lines={["Coverage for every", <>stage of <span className="accent-word">your life</span></>]}
          />
        </div>
      )}

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-2xl border border-navy-700 p-7 transition-colors duration-500 hover:border-gold-500/50"
            >
              <Photo
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/25" aria-hidden />

              <div className="relative">
                <h3 className="text-h3 font-semibold text-ink-50">{s.name}</h3>
                <p className="mt-3 line-clamp-3 text-[0.95rem] text-ink-300">{s.lede}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-medium text-gold-400">
                  Learn more
                  <svg
                    width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { concepts } from "@/content/concepts";

export const metadata: Metadata = { title: "Four directions for NAAHAZ INSURANCE" };

/**
 * The page the client actually opens.
 *
 * Its whole job is to make four choices feel like four choices rather than
 * four versions of the same thing, and to say out loud what each one is for.
 * It uses its own palette rather than borrowing one of the concepts', so no
 * direction gets a head start by being the frame around the others.
 */
export default function ConceptsIndex() {
  return (
    <div data-concept="broadsheet" className="min-h-screen">
      <main className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
        <header className="max-w-3xl">
          <p className="c-eyebrow">NAAHAZ INSURANCE · Design directions · August 2026</p>
          <h1 className="c-display mt-8 text-[clamp(2.4rem,6.4vw,5.4rem)]">
            Four ways this
            <br />
            could{" "}
            <span style={{ fontStyle: "italic", color: "var(--c-accent-deep)" }}>look.</span>
          </h1>
          <p className="mt-9 text-[1.08rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
            Same words, same photographs, same structure. What changes is the world each one puts
            them in. Three are light and one is dark, so the dark option can be judged on screen
            instead of in the abstract. Open them on a phone as well as a laptop. Everything is a
            real page, not a picture of one.
          </p>
          <p className="mt-6 text-[0.95rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
            Navy and gold carry through all four. Headshots, license numbers, carrier logos and
            testimonials are placeholders until we have the real ones.
          </p>
        </header>

        <ul className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          {concepts.map((c, i) => (
            <li key={c.slug}>
              <Link href={`/concepts/${c.slug}`} className="group block">
                {/* The photograph is the container. No bordered cards. */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {/* A screenshot of the concept itself. The hero film's opening
                      frame is the same in three of the four, so using it here
                      made a gallery of four identical cards. */}
                  <Image
                    src={`/concepts/${c.slug}.jpg`}
                    alt={`The top of the ${c.name} homepage`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-top transition-transform duration-[1.4s] group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(to_top,rgba(14,27,46,0.72),transparent)] p-6">
                    <span
                      className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: "var(--c-accent)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: "rgba(244,239,228,0.85)" }}
                    >
                      {c.mode}
                    </span>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="c-display text-[clamp(1.7rem,3vw,2.5rem)]">{c.name}</h2>
                  <p
                    className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--c-accent-deep)" }}
                  >
                    {c.line}
                  </p>
                  <p className="mt-5 max-w-md text-[1rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                    {c.blurb}
                  </p>

                  <dl
                    className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t pt-5 text-[0.85rem]"
                    style={{ borderColor: "var(--c-hairline)" }}
                  >
                    <div>
                      <dt className="c-eyebrow">Type</dt>
                      <dd className="mt-1.5" style={{ color: "var(--c-ink-soft)" }}>
                        {c.type}
                      </dd>
                    </div>
                    <div>
                      <dt className="c-eyebrow">Hero film</dt>
                      <dd className="mt-1.5" style={{ color: "var(--c-ink-soft)" }}>
                        {c.hero}
                      </dd>
                    </div>
                  </dl>

                  <span
                    className="mt-7 inline-flex items-center border-b pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-opacity group-hover:opacity-70"
                    style={{ color: "var(--c-ink)", borderColor: "var(--c-ink)" }}
                  >
                    Open {c.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section
          className="mt-24 border-t pt-12 lg:mt-32"
          style={{ borderColor: "var(--c-hairline)" }}
        >
          <h2 className="c-eyebrow">What is the same in all four</h2>
          <div className="mt-8 grid gap-10 text-[0.98rem] leading-relaxed md:grid-cols-3">
            <p style={{ color: "var(--c-ink-soft)" }}>
              <span className="font-medium" style={{ color: "var(--c-ink)" }}>
                The hero film loads last.
              </span>{" "}
              A still image is what the browser measures for speed, and the film only downloads
              once the page is idle. On a slow connection, or if the visitor has asked for less
              motion, it never downloads at all.
            </p>
            <p style={{ color: "var(--c-ink-soft)" }}>
              <span className="font-medium" style={{ color: "var(--c-ink)" }}>
                Every number is sourced.
              </span>{" "}
              The 2026 Medicare and IRS figures link to CMS and the IRS, with the date they were
              checked. Google holds financial pages to a higher bar than most, and this is how
              that bar gets cleared.
            </p>
            <p style={{ color: "var(--c-ink-soft)" }}>
              <span className="font-medium" style={{ color: "var(--c-ink)" }}>
                The answers are in the page.
              </span>{" "}
              Each answer is written to stand on its own in the first sentence, so it can be
              quoted by an AI overview or lifted into a featured snippet without a click.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

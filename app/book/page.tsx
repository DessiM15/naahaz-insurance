import type { Metadata } from "next";
import Image from "next/image";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BreadcrumbSchema } from "@/components/Schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a free, no-obligation consultation with NAAHAZ INSURANCE. Pick a day that suits you and we'll confirm by email.",
  alternates: { canonical: "/book" },
};

/**
 * A real URL, so it can go on business cards, in email signatures, and behind
 * the Google Business "Book" button. The same flow also opens as a modal from
 * every CTA on the site.
 */
export default function BookPage() {
  const embed = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "Book", href: "/book" }]} />

      <section className="grain relative overflow-hidden pb-28 pt-40">
        <Image src="/images/sections/book.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1b2e] via-[#0a1424]/95 to-[#0e1b2e]" aria-hidden />
        <div className="grain-layer" aria-hidden />

        <div className="container-content relative grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Book a call</Eyebrow>
            </Reveal>
            <RevealLines
            as="h1"
              className="mt-8 text-h1 font-semibold text-ink-50"
              lines={["Pick a time", <>that <span className="accent-word">suits you</span></>]}
            />
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-md text-lead text-ink-300">
                A free, no-obligation conversation — usually thirty minutes. We&rsquo;ll
                look at where you stand and tell you honestly whether we can help.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="mt-11 space-y-4">
                {[
                  "No cost and no obligation",
                  "We shop across carriers, not just one",
                  "In person, by phone, or over video — your choice",
                ].map((point) => (
                  <li key={point} className="flex gap-3.5 text-ink-300">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden>
                      <path d="M4 12.5l5 5L20 7" stroke="var(--color-gold-500)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-11 text-[0.95rem] text-ink-500">
                Prefer to call?{" "}
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                  className="inline-link text-gold-400 underline decoration-gold-500/40 underline-offset-4"
                >
                  {site.contact.phonePrimary}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            {/*
              If the client supplies a Calendly or Acuity link, set
              NEXT_PUBLIC_BOOKING_EMBED_URL and this swaps to the embed. Until
              then the native flow below is fully working, not a placeholder.
            */}
            {embed ? (
              <div className="overflow-hidden border border-ink-50/15 bg-white/5">
                <iframe
                  title="Booking calendar"
                  src={embed}
                  className="h-[46rem] w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <BookingFlow />
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

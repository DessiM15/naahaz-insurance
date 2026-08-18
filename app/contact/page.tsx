import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadSection } from "@/components/sections/LeadSection";
import { BreadcrumbSchema } from "@/components/Schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact NAAHAZ INSURANCE in Rolling Meadows, IL. Call (773) 259-6908 or send us a message and we'll get back to you.",
  alternates: { canonical: "/contact" },
};

type ContactCard = { label: string; lines: { text: string; href?: string }[] };

export default function ContactPage() {
  const { address, phonePrimary, phoneSecondary } = site.contact;
  const mapQuery = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`,
  );

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <section className="container-content pb-16 pt-40">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <RevealLines
            as="h1"
          className="mt-8 max-w-3xl text-h1 font-semibold text-ink-50"
          lines={["Let's have a", <><span className="accent-word">conversation</span></>]}
        />
        <Reveal delay={0.18}>
          <p className="mt-8 max-w-2xl text-lead text-ink-300">
            Call, write, or drop into the office. Whichever you prefer — we answer
            all three.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {([
            {
              label: "Call us",
              lines: [
                { text: phonePrimary, href: `tel:${phonePrimary.replace(/\D/g, "")}` },
                { text: phoneSecondary, href: `tel:${phoneSecondary.replace(/\D/g, "")}` },
              ],
            },
            {
              label: "Visit us",
              lines: [
                { text: address.street },
                { text: `${address.city}, ${address.region} ${address.postalCode}` },
              ],
            },
            {
              label: "Languages",
              lines: [{ text: "English" }, { text: "Русский" }],
            },
          ] as ContactCard[]).map((card, i) => (
            <Reveal key={card.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-navy-700 bg-navy-800/50 p-7">
                <p className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">
                  {card.label}
                </p>
                <div className="mt-5 space-y-1.5">
                  {card.lines.map((l) =>
                    l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        className="inline-link block text-ink-50 transition-colors hover:text-gold-400"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <p key={l.text} className="text-ink-300">
                        {l.text}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TODO(client): confirm office hours before launch. */}
        <Reveal delay={0.2}>
          <div className="mt-5 rounded-2xl border border-dashed border-navy-600 bg-navy-800/30 p-6">
            <p className="text-[0.9rem] text-ink-500">
              <span className="text-ink-300">Office hours</span> — not listed on the
              current site. Send them over and they&rsquo;ll appear here and in the
              LocalBusiness schema, which is what Google reads for the local pack.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-navy-700">
            <iframe
              title={`Map showing ${site.name} at ${address.street}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-80 w-full grayscale-[0.5]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      <LeadSection source="contact" />
    </>
  );
}

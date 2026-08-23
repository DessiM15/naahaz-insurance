import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { LeadWizard } from "@/components/leads/LeadWizard";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { BreadcrumbSchema } from "@/components/Schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact NAAHAZ INSURANCE in Rolling Meadows, IL. Call (773) 259-6908 or send us a message and we'll get back to you.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact.
 *
 * The form is the page, not an afterthought at the bottom of it. Everything
 * else — the address, the numbers, the languages — sits beside it as a
 * masthead-style details column, because someone who wants to phone should
 * not have to scroll past a form to find the number.
 */
const NEXT_STEPS = [
  {
    n: "01",
    title: "We read it the same day",
    body: "Not a ticket queue. It reaches Naureen or Aziz directly, and one of them answers.",
  },
  {
    n: "02",
    title: "A short call, at your convenience",
    body: "Usually twenty minutes. We ask what you have and what worries you. Nothing is sold on this call.",
  },
  {
    n: "03",
    title: "An honest answer",
    body: "If we can improve on what you have, we show you how. If we cannot, we tell you that instead.",
  },
];

export default function ContactPage() {
  const { address, phonePrimary, phoneSecondary } = site.contact;
  const mapQuery = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`,
  );

  return (
    <div className="bs-paper">
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <PageMasthead
        eyebrow="Contact"
        title="Let's have a {conversation}"
        lede="Call, write, or come into the office. Whichever you prefer — we answer all three, in English and Russian."
      />

      {/* ═════════════════════════════════════ THE FORM ── HIGH ── */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28" aria-labelledby="write-heading">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          {/* --- the form ---------------------------------------------- */}
          <div>
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="bs-numeral">01</span>
                <h2 id="write-heading" className="c-display text-[clamp(1.7rem,3.2vw,2.6rem)]">
                  Write to us
                </h2>
              </div>
              <hr className="c-rule mt-6" />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <LeadWizard source="contact" surface="paper" />
              </div>
            </Reveal>
          </div>

          {/* --- the details column ------------------------------------ */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={0.06}>
              <div className="flex items-baseline gap-4">
                <span className="bs-numeral">02</span>
                <h2 className="c-display text-[clamp(1.7rem,3.2vw,2.6rem)]">Or reach us direct</h2>
              </div>
              <hr className="c-rule mt-6" />
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 divide-y" style={{ borderColor: "var(--c-hairline)" }}>
                <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                  <dt className="bs-label pt-1">Telephone</dt>
                  <dd>
                    <a
                      href={`tel:${phonePrimary.replace(/\D/g, "")}`}
                      className="c-display block text-[1.5rem] underline decoration-[var(--c-accent)] decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70"
                    >
                      {phonePrimary}
                    </a>
                    <a
                      href={`tel:${phoneSecondary.replace(/\D/g, "")}`}
                      className="mt-1.5 inline-block text-[0.95rem] transition-opacity hover:opacity-70"
                      style={{ color: "var(--c-ink-soft)" }}
                    >
                      {phoneSecondary}
                    </a>
                  </dd>
                </div>

                <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                  <dt className="bs-label pt-1">Office</dt>
                  <dd>
                    <address className="not-italic leading-relaxed">
                      {address.street}
                      <br />
                      {address.city}, {address.region} {address.postalCode}
                    </address>
                  </dd>
                </div>

                <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                  <dt className="bs-label pt-1">Languages</dt>
                  <dd className="leading-relaxed">English and Русский</dd>
                </div>

                <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                  <dt className="bs-label pt-1">Hours</dt>
                  <dd className="leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
                    {/* TODO(client): confirm office hours. They also feed the
                        LocalBusiness schema, which is what Google reads for
                        the local pack, so this is worth chasing. */}
                    Not yet published — call and we will answer, or send the form and
                    we will come back to you the same day.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ WHAT HAPPENS NEXT ── LOW ── */}
      <section className="on-deep" aria-labelledby="next-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              After you send it
            </p>
            <h2 id="next-heading" className="c-display mt-6 max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)]">
              What actually happens{" "}
              <span style={{ fontStyle: "italic", color: "var(--c-accent)" }}>next</span>
            </h2>
          </Reveal>

          <ol className="mt-16 grid lg:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={0.1 + i * 0.09}
                className="border-t py-10 lg:border-l lg:border-t-0 lg:px-9 lg:py-0 lg:first:pl-0"
              >
                <div style={{ borderColor: "var(--c-hairline)" }}>
                  <p className="text-[0.68rem] tracking-[0.24em]" style={{ color: "var(--c-accent)" }}>
                    {step.n}
                  </p>
                  <h3 className="c-display mt-6 text-[1.6rem] leading-tight">{step.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: "var(--c-on-deep-soft)" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════════════════════════════════════ THE MAP ── HIGH ── */}
      <section className="on-tint border-y" style={{ borderColor: "var(--c-hairline)" }} aria-labelledby="visit-heading">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <span className="bs-numeral">03</span>
                <h2 id="visit-heading" className="c-display text-[clamp(1.7rem,3.2vw,2.6rem)]">
                  Come and see us
                </h2>
              </div>
              <p className="bs-label">
                {address.city}, {address.region}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 overflow-hidden border" style={{ borderColor: "var(--c-hairline)" }}>
              <iframe
                title={`Map showing ${site.name} at ${address.street}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[26rem] w-full grayscale-[0.75] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10">
              <ComingSoon label="Waiting on the client" title="Google Business Profile" numeral="—">
                There is no Google Business Profile for the agency yet. Creating one
                outranks anything else available here — it is what puts the office in
                the local map pack, and it is free. Once it exists, reviews and hours
                surface on this page automatically.
              </ComingSoon>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

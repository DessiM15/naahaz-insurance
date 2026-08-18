import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadWizard } from "@/components/leads/LeadWizard";
import { site } from "@/lib/site";

export function LeadSection({
  defaultInterest,
  source,
  eyebrow = "Get in touch",
  heading,
  body,
  image = "/images/sections/contact.jpg",
}: {
  defaultInterest?: string;
  source: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  body?: string;
  image?: string;
}) {
  return (
    <section id="enquire" className="grain relative overflow-hidden py-32" aria-labelledby="lead-heading">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950/92 to-navy-900" aria-hidden />
      <div className="grain-layer" aria-hidden />

      <div className="container-content relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:pt-4">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="lead-heading" className="mt-7 text-h2 font-semibold text-ink-50">
              {heading ?? (
                <>
                  Ask us a question or <span className="accent-word">request a quote</span>
                </>
              )}
            </h2>
            <p className="mt-7 max-w-md text-lead text-ink-300">
              {body ??
                "Tell us a little about what you're looking for and we'll come back to you with something useful — not a sales call."}
            </p>

            <dl className="mt-11 space-y-6 text-[0.95rem]">
              <div>
                <dt className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Call us</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                    className="inline-link text-ink-50 transition-colors hover:text-gold-400"
                  >
                    {site.contact.phonePrimary}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Visit us</dt>
                <dd className="mt-2 text-ink-300">
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.city}, {site.contact.address.region}{" "}
                  {site.contact.address.postalCode}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <LeadWizard defaultInterest={defaultInterest} source={source} />
        </Reveal>
      </div>
    </section>
  );
}

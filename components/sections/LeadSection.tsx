import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadWizard } from "@/components/leads/LeadWizard";
import { site } from "@/lib/site";
import { tone, type Tone } from "@/components/ui/tone";

export function LeadSection({
  defaultInterest,
  source,
  eyebrow = "Get in touch",
  heading,
  body,
  image = "/images/sections/contact.jpg",
  surface = "dark",
}: {
  defaultInterest?: string;
  source: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  body?: string;
  image?: string;
  surface?: Tone;
}) {
  const t = tone[surface];
  const paper = surface === "paper";

  return (
    <section id="enquire" className={`grain relative overflow-hidden py-32 ${t.section}`} aria-labelledby="lead-heading">
      <Photo src={image} alt="" fill sizes="100vw" className={paper ? "object-cover opacity-[0.05]" : "object-cover opacity-[0.12]"} />
      <div className={`absolute inset-0 ${paper ? "bg-gradient-to-b from-paper-50 via-paper-50/95 to-paper-50" : "bg-gradient-to-b from-navy-900 via-navy-950/92 to-navy-900"}`} aria-hidden />
      <div className="grain-layer" aria-hidden />

      <div className="container-content relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:pt-4">
          <Reveal>
            <Eyebrow surface={surface}>{eyebrow}</Eyebrow>
            <h2 id="lead-heading" className={`mt-7 text-h2 font-semibold ${t.text}`}>
              {heading ?? (
                <>
                  Ask us a question or <span className={t.accent}>request a quote</span>
                </>
              )}
            </h2>
            <p className={`mt-7 max-w-md text-lead ${t.lead}`}>
              {body ??
                "Tell us a little about what you're looking for and we'll come back to you with something useful — not a sales call."}
            </p>

            <dl className="mt-11 space-y-6 text-[0.95rem]">
              <div>
                <dt className={`text-eyebrow uppercase tracking-[0.18em] ${t.muted}`}>Call us</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                    className={`inline-link transition-colors ${paper ? "text-slate-700 hover:text-gold-700" : "text-ink-50 hover:text-gold-400"}`}
                  >
                    {site.contact.phonePrimary}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={`text-eyebrow uppercase tracking-[0.18em] ${t.muted}`}>Visit us</dt>
                <dd className={`mt-2 ${t.body}`}>
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
          <LeadWizard defaultInterest={defaultInterest} source={source} surface={surface} />
        </Reveal>
      </div>
    </section>
  );
}

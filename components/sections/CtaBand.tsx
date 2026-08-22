import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CtaBand({
  heading = ["Let's work out what you", <>actually <span className="accent-word">need</span>.</>],
  body = "A free, no-obligation conversation. We'll tell you honestly whether we can help — and if we're not the right fit, we'll say so.",
  image = "/images/sections/cta.jpg",
}: {
  heading?: React.ReactNode[];
  body?: string;
  image?: string;
}) {
  return (
    <section className="grain relative overflow-hidden py-32" aria-labelledby="cta-heading">
      <Photo src={image} alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1b2e] via-[#0e1b2e]/88 to-[#0e1b2e]/70" aria-hidden />
      <div className="mesh-drift absolute inset-0 opacity-60" aria-hidden />
      <div className="grain-layer" aria-hidden />

      <div className="container-content relative text-center">
        <RevealLines
          id="cta-heading"
          className="mx-auto max-w-3xl text-h1 font-semibold text-ink-50"
          lines={heading}
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lead text-ink-300">{body}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/book" arrow>
              Book a Strategy Call
            </ButtonLink>
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center border border-ink-50/35 px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-ink-50 transition-all duration-300 hover:border-gold-500"
            >
              {site.contact.phonePrimary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/88 to-navy-900/70" aria-hidden />
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
              className="inline-flex items-center justify-center rounded-full border border-navy-600 bg-navy-900/40 px-8 text-base font-medium text-ink-50 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/60"
            >
              {site.contact.phonePrimary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

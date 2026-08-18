import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Faq } from "@/content/services";

/**
 * FAQ list. Native <details> rather than a JS accordion — it works without
 * JavaScript, it's keyboard accessible for free, and browser find-in-page can
 * open it. The FAQPage schema for rich results is emitted by the caller.
 */
export function Faqs({ faqs, eyebrow = "Common questions" }: { faqs: Faq[]; eyebrow?: string }) {
  return (
    <section id="faq" className="container-content py-28" aria-labelledby="faq-heading">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="faq-heading" className="mt-7 text-h2 font-semibold text-ink-50">
              Questions we hear <span className="accent-word">often</span>
            </h2>
          </Reveal>
        </div>

        <div className="divide-y divide-navy-700 border-y border-navy-700">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.05rem] font-medium text-ink-50 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="mt-1.5 shrink-0 text-gold-500 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl pr-10 text-ink-300">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

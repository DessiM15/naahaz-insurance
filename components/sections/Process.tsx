import Image from "next/image";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

const STEPS = [
  {
    n: "01",
    title: "A free consultation",
    body: "We start by listening. What you have, what you're worried about, and what you want the next twenty years to look like. No pitch, no obligation.",
  },
  {
    n: "02",
    title: "We shop the market for you",
    body: "As an independent agency we aren't tied to one carrier. We compare across the market on the things that matter — coverage, network, cost over time — and bring you the honest shortlist.",
  },
  {
    n: "03",
    title: "You're covered, and we stay",
    body: "We handle the paperwork and the enrolment. Then we review it with you annually, because plans change, prices change, and so does your life.",
  },
];

export function Process() {
  return (
    <section className="grain relative overflow-hidden py-32" aria-labelledby="process-heading">
      <Image
        src="/images/sections/process.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/85 to-navy-900" aria-hidden />
      <div className="grain-layer" aria-hidden />

      <div className="container-content relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <RevealLines
            id="process-heading"
            className="mt-7 text-h2 font-semibold text-ink-50"
            lines={["Three steps. No", <>jargon, no <span className="accent-word">pressure</span>.</>]}
          />
        </div>

        <ol className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.12}>
              <div className="rule-hairline pt-7">
                <span className="font-mono text-[0.9rem] text-gold-500">{s.n}</span>
                <h3 className="mt-5 text-h3 font-semibold text-ink-50">{s.title}</h3>
                <p className="mt-4 text-ink-300">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <div className="mt-16">
            <ButtonLink href="/book" arrow>
              Start with a free consultation
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

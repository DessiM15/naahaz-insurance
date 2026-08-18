import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Duotone } from "@/components/media/Duotone";
import { CtaBand } from "@/components/sections/CtaBand";
import { Process } from "@/components/sections/Process";
import { BreadcrumbSchema } from "@/components/Schema";
import { clientCopy } from "@/content/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NAAHAZ INSURANCE is an independent insurance and financial services agency in Rolling Meadows, Illinois, founded by Naureen and Aziz Ali.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Trust", body: "We tell you what we'd tell our own family, including when the answer is that you don't need what we sell." },
  { title: "Transparency", body: "Plain language, real numbers, and the trade-offs stated out loud. No product gets recommended without its downsides attached." },
  { title: "Understanding", body: "We listen first. The right coverage depends entirely on your life, and we can't know that from a form." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="grain relative flex min-h-[70svh] items-end overflow-hidden pb-24 pt-40">
        <Duotone
          src="/images/about/hero.jpg"
          alt="Two people talking across a desk in a bright office"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" aria-hidden />
        <div className="mesh-drift absolute inset-0 opacity-50" aria-hidden />

        <div className="container-content relative">
          <Reveal>
            <Eyebrow>About NAAHAZ Inc.</Eyebrow>
          </Reveal>
          <RevealLines
            as="h1"
            className="mt-8 max-w-4xl text-h1 font-semibold text-ink-50"
            lines={["Two names.", <>One <span className="accent-word">promise</span>.</>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lead text-ink-300">{clientCopy.aboutIntro}</p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- The name */}
      <section className="container-content py-28" aria-labelledby="name-heading">
        <Reveal>
          <div className="relative mb-20 aspect-21/9 overflow-hidden rounded-3xl border border-navy-700">
            <Duotone
              src="/images/about/generations.jpg"
              alt="An adult and a child standing together at the shoreline"
              sizes="100vw"
              intensity={0.85}
            />
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Where the name comes from</Eyebrow>
            <h2 id="name-heading" className="mt-7 text-h2 font-semibold text-ink-50">
              <span className="text-gold-500">Na</span>ureen and{" "}
              <span className="text-gold-500">Az</span>iz
            </h2>
            {/*
              TODO(client): confirm the NAAHAZ = Naureen + Aziz origin. It's a
              strong story and this whole section rests on it — if it isn't
              accurate, tell us and we'll pivot to the practice's founding
              instead. Nothing here is invented beyond that one assumption.
            */}
          </Reveal>

          <div className="lg:pt-3">
            <Reveal delay={0.1}>
              <p className="text-lead text-ink-200">
                The agency carries the names of the two people who run it. That isn&rsquo;t
                branding — it&rsquo;s accountability. When something goes wrong with a claim,
                you aren&rsquo;t routed to a call centre. You call the people whose names are
                on the door.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-ink-300">{clientCopy.mission}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-7 text-ink-300">
                We work with individuals, families and businesses across Illinois, and
                we serve clients in both English and Russian. Being independent means
                we aren&rsquo;t tied to any one carrier — we shop the market and bring you
                what fits, not what pays best.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- People */}
      <section className="container-content pb-28" aria-labelledby="people-heading">
        <Reveal>
          <h2 id="people-heading" className="text-h2 font-semibold text-ink-50">
            The people you&rsquo;ll <span className="accent-word">actually talk to</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
          {site.founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/50">
                {/*
                  TODO(client): headshots needed. The slot is designed and sized —
                  drop a photo in and it renders. Real faces are the single
                  biggest trust signal on an insurance site, so this is the most
                  valuable outstanding asset.
                */}
                <div className="flex aspect-4/5 items-center justify-center border-b border-navy-700 bg-navy-900/60">
                  <div className="text-center">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="mx-auto text-navy-600" aria-hidden>
                      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="mt-3 text-[0.78rem] text-ink-500">Photo to come</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-h3 font-semibold text-ink-50">{f.name}</h3>
                  <p className="mt-1.5 text-[0.9rem] text-gold-400">{f.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- Values */}
      <section className="grain relative overflow-hidden py-28" aria-labelledby="values-heading">
        <div className="absolute inset-0 bg-navy-800/40" aria-hidden />
        <div className="grain-layer" aria-hidden />
        <div className="container-content relative">
          <Reveal>
            <Eyebrow>What we stand on</Eyebrow>
            <h2 id="values-heading" className="mt-7 max-w-2xl text-h2 font-semibold text-ink-50">
              Built on {clientCopy.values.split(",")[0]},{" "}
              <span className="accent-word">transparency</span>, and listening
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rule-hairline pt-6">
                  <h3 className="text-h3 font-semibold text-ink-50">{v.title}</h3>
                  <p className="mt-4 text-ink-300">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="relative mt-16 aspect-21/9 overflow-hidden rounded-3xl border border-navy-700">
              <Photo
                src="/images/about/office.jpg"
                alt="A quiet meeting room with natural light"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/45 mix-blend-multiply" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Local */}
      <section className="container-content py-28" aria-labelledby="local-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Rolling Meadows, Illinois</Eyebrow>
            <h2 id="local-heading" className="mt-7 text-h2 font-semibold text-ink-50">
              A <span className="accent-word">Chicagoland</span> practice
            </h2>
            <p className="mt-7 text-lead text-ink-300">
              We&rsquo;re based in Rolling Meadows and most of our clients are within an
              hour of the office. That matters more than it sounds — plan
              availability, provider networks and care costs are all local
              questions, and we know this market.
            </p>
            <address className="mt-9 not-italic text-ink-300">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, {site.contact.address.region}{" "}
              {site.contact.address.postalCode}
            </address>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-navy-700">
              <Photo
                src="/images/about/chicago.jpg"
                alt="Chicago architecture against a bright sky"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/30 mix-blend-multiply" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- Testimonials */}
      <section id="testimonials" className="container-content pb-28" aria-labelledby="testimonials-heading">
        <Reveal>
          <Eyebrow>Client reviews</Eyebrow>
          <h2 id="testimonials-heading" className="mt-7 text-h2 font-semibold text-ink-50">
            In their <span className="accent-word">words</span>
          </h2>
        </Reveal>
        {/* TODO(client): real testimonials. Legacy /insurance-reviews 301s here. */}
        <Reveal delay={0.12}>
          <div className="mt-10 rounded-3xl border border-dashed border-navy-600 bg-navy-800/40 p-12 text-center">
            <p className="mx-auto max-w-lg text-ink-300">
              Built and waiting on real reviews — the legacy{" "}
              <span className="text-ink-50">/insurance-reviews</span> page redirects
              here. Send three or four and they drop in with Review schema attached.
            </p>
          </div>
        </Reveal>
      </section>

      <Process />
      <CtaBand
        heading={["Let's start with a", <>simple <span className="accent-word">conversation</span></>]}
        body="No pitch and no obligation — just a straight assessment of where you stand."
        image="/images/about/community.jpg"
      />
    </>
  );
}

import type { Metadata } from "next";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { ComingSoon } from "@/components/sections/ComingSoon";
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
    <div className="bs-paper">
      <BreadcrumbSchema trail={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <PageMasthead
        eyebrow="About NAAHAZ Inc."
        title="Two names. One {promise}."
        lede={clientCopy.aboutIntro}
      />

      {/* The photograph sits under the masthead, full bleed, so the page still
          opens on a face rather than on type alone. */}
      <div className="relative h-[40svh] min-h-64 overflow-hidden lg:h-[56svh]">
        <Duotone
          src="/images/about/hero.jpg"
          alt="Two people talking across a desk in a bright office"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(14,27,46,0.5) 0%, rgba(14,27,46,0.1) 60%, rgba(14,27,46,0.28) 100%)" }}
          aria-hidden
        />
      </div>

      {/* --------------------------------------------------------- The name */}
      <section className="container-content py-28" aria-labelledby="name-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal>
            <Eyebrow surface="paper">Where the name comes from</Eyebrow>
            <h2 id="name-heading" className="mt-7 text-h2 font-semibold text-slate-700">
              {/* gold-700, not gold-500: only the darkest gold clears AA as
                  text on paper. See the token block in app/globals.css. */}
              <span className="text-gold-700">Na</span>ureen and{" "}
              <span className="text-gold-700">Az</span>iz
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
              <p className="text-lead text-slate-700">
                The agency carries the names of the two people who run it. That isn&rsquo;t
                branding — it&rsquo;s accountability. When something goes wrong with a claim,
                you aren&rsquo;t routed to a call centre. You call the people whose names are
                on the door.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-slate-700/85">{clientCopy.mission}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-7 text-slate-700/85">
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
          <h2 id="people-heading" className="text-h2 font-semibold text-slate-700">
            The people you&rsquo;ll <span className="accent-word-paper">actually talk to</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
          {site.founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div className="overflow-hidden border border-paper-300 bg-paper-100">
                {/*
                  TODO(client): headshots needed. The slot is designed and sized —
                  drop a photo in and it renders. Real faces are the single
                  biggest trust signal on an insurance site, so this is the most
                  valuable outstanding asset.
                */}
                <div className="flex aspect-4/5 items-center justify-center border-b border-paper-300 bg-paper-200">
                  <div className="text-center">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="mx-auto text-slate-500/60" aria-hidden>
                      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="mt-3 text-[0.78rem] text-slate-500">Photo to come</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-h3 font-semibold text-slate-700">{f.name}</h3>
                  <p className="mt-1.5 text-[0.9rem] text-slate-500">{f.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- Values */}
      {/* The alternating ground. Broadsheet runs bone, tint, bone rather than
          two identical sections in a row. */}
      <section className="on-tint relative overflow-hidden py-28" aria-labelledby="values-heading">
        <div className="container-content relative">
          <Reveal>
            <Eyebrow surface="paper">What we stand on</Eyebrow>
            <h2 id="values-heading" className="mt-7 max-w-2xl text-h2 font-semibold text-slate-700">
              Built on {clientCopy.values.split(",")[0]},{" "}
              <span className="accent-word-paper">transparency</span>, and listening
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rule-paper pt-6">
                  <h3 className="text-h3 font-semibold text-slate-700">{v.title}</h3>
                  <p className="mt-4 text-slate-700/85">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="relative mt-16 aspect-21/9 overflow-hidden border border-paper-300">
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
            <Eyebrow surface="paper">Rolling Meadows, Illinois</Eyebrow>
            <h2 id="local-heading" className="mt-7 text-h2 font-semibold text-slate-700">
              A <span className="accent-word-paper">Chicagoland</span> practice
            </h2>
            <p className="mt-7 text-lead text-slate-700/85">
              We&rsquo;re based in Rolling Meadows and most of our clients are within an
              hour of the office. That matters more than it sounds — plan
              availability, provider networks and care costs are all local
              questions, and we know this market.
            </p>
            <address className="mt-9 not-italic text-slate-700/85">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, {site.contact.address.region}{" "}
              {site.contact.address.postalCode}
            </address>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-4/3 overflow-hidden border border-paper-300">
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
          <Eyebrow surface="paper">Client reviews</Eyebrow>
          <h2 id="testimonials-heading" className="mt-7 text-h2 font-semibold text-slate-700">
            In their <span className="accent-word-paper">words</span>
          </h2>
        </Reveal>
        {/* TODO(client): real testimonials. Legacy /insurance-reviews 301s here. */}
        <Reveal delay={0.12}>
          <div className="mt-10">
            <ComingSoon label="Waiting on the client" title="In their words" numeral="—">
              Real reviews only. Nothing here is invented, which is why the slot is
              empty rather than filled with plausible-sounding quotes. The legacy{" "}
              <span style={{ color: "var(--c-ink)" }}>/insurance-reviews</span> page
              redirects here — send three or four and they drop in with Review schema
              attached.
            </ComingSoon>
          </div>
        </Reveal>
      </section>

      <Process />
      <CtaBand
        heading={["Let's start with a", <>simple <span className="accent-word">conversation</span></>]}
        body="No pitch and no obligation — just a straight assessment of where you stand."
        image="/images/about/community.jpg"
      />
    </div>
  );
}

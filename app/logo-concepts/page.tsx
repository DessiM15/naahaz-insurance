import type { Metadata } from "next";
import { LOGO_CONCEPTS, type LogoConceptId } from "@/lib/brand";
import { FULL_MARKS, MARKS } from "@/components/logo/marks";
import { ACTIVE_CONCEPT } from "@/components/logo/Logo";

export const metadata: Metadata = {
  title: "Logo Concepts — Internal Review",
  // Internal review surface. Never index this.
  robots: { index: false, follow: false, nocache: true },
};

export default function LogoConceptsPage() {
  return (
    <div className="pt-36 pb-32">
      <header className="container-content max-w-3xl">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-gold-400">
          Internal review · not indexed
        </p>
        <h1 className="mt-6 text-h1 font-semibold text-ink-50">
          Four directions for <span className="accent-word">NAAHAZ</span>
        </h1>
        <p className="mt-7 text-lead text-ink-300">
          Each mark is built as monoline strokes at a consistent weight, so you are
          comparing the <em>form</em> rather than the thickness. Every one animates
          on with a path draw in the loading screen. Pick one and the header,
          loader, favicon and brand kit all follow from a single line of config.
        </p>
        <p className="mt-5 rounded-xl border border-navy-700 bg-navy-800/60 px-5 py-4 text-[0.95rem] text-ink-500">
          Currently wired into the live site:{" "}
          <strong className="text-gold-400">
            {LOGO_CONCEPTS.find((c) => c.id === ACTIVE_CONCEPT)?.name}
          </strong>{" "}
          — change <code className="text-ink-300">ACTIVE_CONCEPT</code> in{" "}
          <code className="text-ink-300">components/logo/Logo.tsx</code> to switch.
        </p>
      </header>

      <div className="mt-24 space-y-28">
        {LOGO_CONCEPTS.map((concept, i) => (
          <Concept key={concept.id} concept={concept} index={i} />
        ))}
      </div>
    </div>
  );
}

function Concept({
  concept,
  index,
}: {
  concept: (typeof LOGO_CONCEPTS)[number];
  index: number;
}) {
  const Mark = MARKS[concept.id as LogoConceptId];
  const Full = FULL_MARKS[concept.id as LogoConceptId];
  const isWordmark = concept.id === "wordmark";

  return (
    <section className="container-content" aria-labelledby={`c-${concept.id}`}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* --- Rationale ------------------------------------------------- */}
        <div className="lg:pt-6">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.8rem] text-gold-500">
              0{index + 1}
            </span>
            <h2 id={`c-${concept.id}`} className="text-h2 font-semibold text-ink-50">
              {concept.name}
            </h2>
          </div>

          <p className="mt-6 text-ink-300">{concept.rationale}</p>

          <ul className="mt-8 space-y-3">
            {concept.strengths.map((s) => (
              <li key={s} className="flex gap-3 text-[0.98rem] text-ink-300">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" aria-hidden />
                {s}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-l-2 border-navy-600 pl-5 text-[0.95rem] text-ink-500">
            <span className="text-ink-300">Trade-off — </span>
            {concept.tradeoff}
          </p>
        </div>

        {/* --- Specimens -------------------------------------------------- */}
        <div className="space-y-5">
          {/* Primary, on navy */}
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-navy-700 bg-navy-800/50 p-12">
            <Full
              className={isWordmark ? "w-full max-w-md" : "w-32 h-32"}
              stroke="var(--color-ink-50)"
              accent="var(--color-gold-500)"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Reversed, on light */}
            <div className="flex min-h-44 items-center justify-center rounded-2xl bg-ink-50 p-9">
              <Full
                className={isWordmark ? "w-full" : "w-20 h-20"}
                stroke="var(--color-navy-900)"
                accent="var(--color-gold-600)"
              />
            </div>

            {/* Single colour, gold on near-black */}
            <div className="flex min-h-44 items-center justify-center rounded-2xl bg-navy-950 p-9">
              <Full
                className={isWordmark ? "w-full" : "w-20 h-20"}
                stroke="var(--color-gold-500)"
                accent="var(--color-gold-500)"
              />
            </div>
          </div>

          {/* Lockup + small-size legibility */}
          <div className="rounded-2xl border border-navy-700 bg-navy-800/50 p-8">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">
              Lockup + small sizes
            </p>

            <div className="mt-7 flex items-center gap-4">
              <Mark className="h-11 w-11 shrink-0" stroke="var(--color-ink-50)" accent="var(--color-gold-500)" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-[0.2em] text-ink-50">NAAHAZ</span>
                <span className="mt-1.5 text-[0.62rem] tracking-[0.32em] text-ink-500">
                  INSURANCE
                </span>
              </span>
            </div>

            <div className="mt-9 flex items-end gap-7 border-t border-navy-700 pt-7">
              {[48, 32, 24, 16].map((px) => (
                <div key={px} className="flex flex-col items-center gap-2.5">
                  <Mark
                    style={{ width: px, height: px }}
                    stroke="var(--color-ink-50)"
                    accent="var(--color-gold-500)"
                  />
                  <span className="font-mono text-[0.65rem] text-ink-500">{px}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[0.85rem] text-ink-500">
              16px is the favicon test — if it holds together there, it holds anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

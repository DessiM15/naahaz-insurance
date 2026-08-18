import type { Metadata } from "next";
import { MARK_CONCEPTS, WORDMARK_CONCEPTS, type MarkId, type WordmarkConceptId } from "@/lib/brand";
import { MARKS } from "@/components/logo/marks";
import { Wordmark, WordmarkCompact } from "@/components/logo/wordmark";
import { ACTIVE_LOGO } from "@/components/logo/active";

export const metadata: Metadata = {
  title: "Logo Concepts — Internal Review",
  robots: { index: false, follow: false, nocache: true },
};

const activeName =
  ACTIVE_LOGO.kind === "wordmark"
    ? WORDMARK_CONCEPTS.find((c) => c.id === ACTIVE_LOGO.id)?.name
    : MARK_CONCEPTS.find((c) => c.id === ACTIVE_LOGO.id)?.name;

export default function LogoConceptsPage() {
  return (
    <div className="pb-32 pt-36">
      <header className="container-content max-w-3xl">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-gold-400">
          Internal review · round two · not indexed
        </p>
        <h1 className="mt-6 text-h1 font-semibold text-ink-50">
          The wordmark, <span className="accent-word">six ways</span>
        </h1>

        <div className="mt-8 space-y-5 text-lead text-ink-300">
          <p>
            The rule running through the name is gone. Worth knowing why it looked
            wrong: it wasn&rsquo;t only decoration — it was doubling as the crossbar of
            the H. So the eye read a word being struck through <em>and</em> a letter
            missing a piece of itself, at the same time.
          </p>
          <p>
            The letterforms have been rebuilt so the H carries its own bar. Below
            are six ways to accent the same drawing, plus five symbol marks
            underneath — two of them new.
          </p>
        </div>

        <p className="mt-8 rounded-xl border border-navy-700 bg-navy-800/60 px-5 py-4 text-[0.95rem] text-ink-500">
          Currently live on the site: <strong className="text-gold-400">{activeName}</strong> — set{" "}
          <code className="text-ink-300">ACTIVE_LOGO</code> in{" "}
          <code className="text-ink-300">components/logo/active.ts</code> to change it.
        </p>
      </header>

      {/* ------------------------------------------------------- Wordmarks */}
      <section className="mt-24" aria-labelledby="wordmarks-heading">
        <div className="container-content">
          <h2 id="wordmarks-heading" className="text-h2 font-semibold text-ink-50">
            Wordmark variants
          </h2>
          <p className="mt-4 max-w-2xl text-ink-500">
            Identical letterforms throughout. Only the accent changes, so you&rsquo;re
            comparing the idea rather than six different drawings.
          </p>
        </div>

        <div className="mt-14 space-y-20">
          {WORDMARK_CONCEPTS.map((c, i) => (
            <WordmarkSpecimen key={c.id} concept={c} index={i} />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- Marks */}
      <section className="mt-32" aria-labelledby="marks-heading">
        <div className="container-content">
          <h2 id="marks-heading" className="text-h2 font-semibold text-ink-50">
            Symbol marks
          </h2>
          <p className="mt-4 max-w-2xl text-ink-500">
            Either a companion to whichever wordmark you pick — for app icons,
            favicons and social avatars — or a standalone identity in its own
            right. <span className="text-gold-400">One Line</span> and{" "}
            <span className="text-gold-400">The Keystone</span> are new this round.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MARK_CONCEPTS.map((c) => (
              <MarkSpecimen key={c.id} concept={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function WordmarkSpecimen({
  concept,
  index,
}: {
  concept: (typeof WORDMARK_CONCEPTS)[number];
  index: number;
}) {
  const id = concept.id as WordmarkConceptId;
  const isLive = ACTIVE_LOGO.kind === "wordmark" && ACTIVE_LOGO.id === id;

  return (
    <section className="container-content" aria-labelledby={`w-${id}`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:pt-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.8rem] text-gold-500">0{index + 1}</span>
            <h3 id={`w-${id}`} className="text-h3 font-semibold text-ink-50">
              {concept.name}
            </h3>
            {isLive && (
              <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[0.7rem] text-gold-400">
                live
              </span>
            )}
          </div>
          <p className="mt-5 text-ink-300">{concept.rationale}</p>
          <p className="mt-5 border-l-2 border-navy-600 pl-5 text-[0.9rem] text-ink-500">
            {concept.note}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex min-h-44 items-center justify-center rounded-2xl border border-navy-700 bg-navy-800/50 px-10 py-12">
            <Wordmark variant={id} className="w-full max-w-lg" stroke="var(--color-ink-50)" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex min-h-32 items-center justify-center rounded-2xl bg-ink-50 px-7 py-9">
              <Wordmark
                variant={id}
                className="w-full"
                stroke="var(--color-navy-900)"
                accent="var(--color-gold-600)"
              />
            </div>
            <div className="flex min-h-32 items-center justify-center rounded-2xl bg-navy-950 px-7 py-9">
              <Wordmark
                variant={id}
                className="w-full"
                stroke="var(--color-gold-500)"
                accent="var(--color-gold-500)"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-navy-700 bg-navy-800/50 p-7">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">
              Companion mark · small sizes
            </p>
            <div className="mt-6 flex items-end gap-7">
              {[48, 32, 24, 16].map((px) => (
                <div key={px} className="flex flex-col items-center gap-2.5">
                  <WordmarkCompact variant={id} style={{ width: px, height: px }} stroke="var(--color-ink-50)" />
                  <span className="font-mono text-[0.65rem] text-ink-500">{px}</span>
                </div>
              ))}
              <div className="ml-auto hidden max-w-56 text-right sm:block">
                <p className="text-[0.8rem] text-ink-500">
                  A wordmark can&rsquo;t survive 16px, so each one ships with this
                  companion for favicons and app icons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarkSpecimen({ concept }: { concept: (typeof MARK_CONCEPTS)[number] }) {
  const id = concept.id as MarkId;
  const Mark = MARKS[id];
  const isLive = ACTIVE_LOGO.kind === "mark" && ACTIVE_LOGO.id === id;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/50">
      <div className="flex min-h-44 items-center justify-center border-b border-navy-700 bg-navy-900/40 p-9">
        <Mark className="h-24 w-24" stroke="var(--color-ink-50)" accent="var(--color-gold-500)" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-[1.05rem] font-semibold text-ink-50">{concept.name}</h3>
          {isLive && (
            <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.65rem] text-gold-400">
              live
            </span>
          )}
        </div>
        <p className="mt-3 flex-1 text-[0.92rem] text-ink-300">{concept.rationale}</p>
        <p className="mt-4 text-[0.82rem] text-ink-500">{concept.note}</p>

        <div className="mt-6 flex items-end gap-5 border-t border-navy-700 pt-5">
          {[40, 24, 16].map((px) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <Mark style={{ width: px, height: px }} stroke="var(--color-ink-50)" accent="var(--color-gold-500)" />
              <span className="font-mono text-[0.62rem] text-ink-500">{px}</span>
            </div>
          ))}
          <div className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50">
            <Mark className="h-7 w-7" stroke="var(--color-navy-900)" accent="var(--color-gold-600)" />
          </div>
        </div>
      </div>
    </div>
  );
}

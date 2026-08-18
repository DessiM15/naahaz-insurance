import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function LegalPage({
  title,
  lede,
  needsReview = false,
  children,
}: {
  title: string;
  lede: string;
  needsReview?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="container-content pb-24 pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-7 text-h1 font-semibold text-ink-50">{title}</h1>
          <p className="mt-6 text-lead text-ink-300">{lede}</p>
        </Reveal>

        {needsReview && (
          <Reveal delay={0.1}>
            {/*
              Visible on purpose. A placeholder legal page that looks finished
              is worse than one that says what it is — this comes out the moment
              the client's counsel signs off on the wording.
            */}
            <p className="mt-9 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-6 text-[0.88rem] leading-relaxed text-ink-300">
              <span className="font-semibold text-gold-400">Draft — pending review.</span>{" "}
              This page is a working placeholder. It must be reviewed by the
              agency&rsquo;s attorney, or replaced with the existing policy from the
              current site, before launch.
            </p>
          </Reveal>
        )}

        <div className="mt-14 space-y-12">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-h3 font-semibold text-ink-50">{title}</h2>
        <div className="mt-4 space-y-4 text-ink-300">{children}</div>
      </section>
    </Reveal>
  );
}

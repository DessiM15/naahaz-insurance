import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PageMasthead } from "@/components/sections/PageMasthead";

/**
 * Privacy and Terms.
 *
 * Opens on the same masthead as every other section front, so the legal pages
 * do not read as a different, older website. The body stays a single measured
 * column — this is the one place on the site where someone genuinely reads
 * top to bottom.
 */
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
    <div className="bs-paper">
      <PageMasthead eyebrow="Legal" title={title} lede={lede} />

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-3xl">
          {needsReview && (
            <Reveal>
              {/*
                Visible on purpose. A placeholder legal page that looks finished
                is worse than one that says what it is — this comes out the moment
                the client's counsel signs off on the wording.
              */}
              <p
                className="border-l-2 p-6 text-[0.9rem] leading-relaxed"
                style={{
                  borderColor: "var(--c-accent)",
                  background: "var(--c-tint)",
                  color: "var(--c-ink)",
                }}
              >
                <span className="bs-label" style={{ color: "var(--c-accent-deep)" }}>
                  Draft &mdash; pending review
                </span>
                <br />
                <span className="mt-2 inline-block">
                  This page is a working placeholder. It must be reviewed by the
                  agency&rsquo;s attorney, or replaced with the existing policy from the
                  current site, before launch.
                </span>
              </p>
            </Reveal>
          )}

          <div className="mt-14 space-y-12">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section>
        <div className="flex items-baseline gap-4">
          <span className="bs-numeral">&mdash;</span>
          <h2 className="c-display text-[clamp(1.3rem,2.2vw,1.75rem)]">{title}</h2>
        </div>
        <hr className="c-rule mt-5" />
        <div className="mt-5 space-y-4 leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
          {children}
        </div>
      </section>
    </Reveal>
  );
}

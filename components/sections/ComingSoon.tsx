import type { ReactNode } from "react";

/**
 * A slot that is built but waiting on the client.
 *
 * These used to be dashed boxes, which read as an unfinished page rather than
 * a considered one. The content is honest either way — nothing here is
 * invented — but a designed panel says "reserved" where a dashed rectangle
 * says "broken".
 *
 * It stays visibly a placeholder on purpose. A holding panel that looks
 * finished is worse than one that says what it is, because nobody remembers
 * to come back for it.
 */
export function ComingSoon({
  label,
  title,
  children,
  numeral,
}: {
  label: string;
  title: string;
  children: ReactNode;
  /** Optional section number, set in the display face. */
  numeral?: string;
}) {
  return (
    <div className="relative overflow-hidden border" style={{ borderColor: "var(--c-hairline)", background: "var(--c-card)" }}>
      {/* A gold rule down the left edge rather than a dashed outline. */}
      <span className="absolute inset-y-0 left-0 w-0.5" style={{ background: "var(--c-accent)" }} aria-hidden />

      <div className="grid gap-6 p-10 sm:grid-cols-[1fr_auto] sm:items-center lg:p-14">
        <div>
          <div className="flex items-center gap-3">
            {numeral && <span className="bs-numeral">{numeral}</span>}
            <span className="bs-label" style={{ color: "var(--c-accent-deep)" }}>
              {label}
            </span>
          </div>

          <h3 className="c-display mt-4 text-[clamp(1.4rem,2.4vw,2rem)]">{title}</h3>

          <div className="mt-4 max-w-xl text-[0.98rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
            {children}
          </div>
        </div>

        {/* A quiet plate, so the panel has weight without pretending to hold
            content it does not have. */}
        <div
          className="hidden h-24 w-24 shrink-0 items-center justify-center border sm:flex"
          style={{ borderColor: "var(--c-hairline)" }}
          aria-hidden
        >
          <span className="c-display text-[2.2rem]" style={{ color: "var(--c-hairline)" }}>
            &mdash;
          </span>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";
import type { LogoConceptId } from "@/lib/brand";
import { MARKS } from "./marks";

/**
 * The concept currently wired into the live site.
 *
 * Phase 1 ships all four for review — change this one line once the concept
 * is chosen and the header, loader, and favicon all follow.
 */
export const ACTIVE_CONCEPT: LogoConceptId = "monogram";

type LockupVariant = "mark" | "primary" | "full";

const SIZES: Record<LockupVariant, { mark: number; name: string; sub: string }> = {
  mark:    { mark: 34, name: "",           sub: "" },
  primary: { mark: 32, name: "text-[1.05rem]", sub: "" },
  full:    { mark: 40, name: "text-[1.15rem]", sub: "text-[0.6rem]" },
};

export function Logo({
  variant = "primary",
  concept = ACTIVE_CONCEPT,
  className = "",
}: {
  variant?: LockupVariant;
  concept?: LogoConceptId;
  className?: string;
}) {
  const Mark = MARKS[concept];
  const s = SIZES[variant];

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark
        style={{ width: s.mark, height: s.mark }}
        stroke="currentColor"
        accent="var(--color-gold-500)"
        className="shrink-0"
      />
      {variant !== "mark" && (
        <span className="flex flex-col leading-none">
          <span
            className={`${s.name} font-semibold tracking-[0.2em] text-ink-50`}
          >
            NAAHAZ
          </span>
          {variant === "full" && (
            <span className={`${s.sub} mt-1.5 tracking-[0.32em] text-ink-500`}>
              INSURANCE
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/** Header logo — wraps the lockup in a home link with an accessible name. */
export function LogoLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center text-ink-50 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Logo variant="primary" />
    </Link>
  );
}

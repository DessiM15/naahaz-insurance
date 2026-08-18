import Link from "next/link";
import { site } from "@/lib/site";
import { MARKS } from "./marks";
import { Wordmark, WordmarkCompact } from "./wordmark";
import { ACTIVE_LOGO } from "./active";

export { ACTIVE_LOGO };

type LockupVariant = "mark" | "primary" | "full";

/**
 * The logo lockup.
 *
 * A wordmark identity and a symbol identity need different lockups — the
 * wordmark IS the name, so it doesn't get set text beside it, while a symbol
 * always does. This component resolves that from ACTIVE_LOGO so no page has
 * to know which kind is currently live.
 */
export function Logo({
  variant = "primary",
  className = "",
}: {
  variant?: LockupVariant;
  className?: string;
}) {
  if (ACTIVE_LOGO.kind === "wordmark") {
    if (variant === "mark") {
      return (
        <WordmarkCompact
          variant={ACTIVE_LOGO.id}
          className={`h-9 w-9 ${className}`}
          stroke="currentColor"
        />
      );
    }

    return (
      <span className={`inline-flex flex-col ${className}`}>
        <Wordmark
          variant={ACTIVE_LOGO.id}
          stroke="currentColor"
          className={variant === "full" ? "w-44" : "w-36"}
        />
        {variant === "full" && (
          <span className="mt-2.5 pl-0.5 text-[0.6rem] tracking-[0.42em] text-ink-500">
            INSURANCE
          </span>
        )}
      </span>
    );
  }

  const Mark = MARKS[ACTIVE_LOGO.id];
  const size = variant === "full" ? 40 : 32;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark
        style={{ width: size, height: size }}
        stroke="currentColor"
        accent="var(--color-gold-500)"
        className="shrink-0"
      />
      {variant !== "mark" && (
        <span className="flex flex-col leading-none">
          <span className={`${variant === "full" ? "text-[1.15rem]" : "text-[1.05rem]"} font-semibold tracking-[0.2em] text-ink-50`}>
            NAAHAZ
          </span>
          {variant === "full" && (
            <span className="mt-1.5 text-[0.6rem] tracking-[0.32em] text-ink-500">
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

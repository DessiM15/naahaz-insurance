import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Navy text on a gold fill measures 7.49:1 — the best contrast on the site —
 * so the primary button is unchanged on paper. The outline variants are not
 * so lucky: gold text fails AA on paper, so those go navy there.
 *
 * Square, uppercase and tracked, because the Broadsheet has no radius in it.
 * A pill button here would not read as the same site as the homepage.
 */
const styles = {
  primary:
    "bg-gold-600 text-navy-950 hover:-translate-y-0.5 hover:bg-gold-500",
  secondary:
    "border border-ink-50/35 text-ink-50 hover:-translate-y-0.5 hover:border-gold-500",
  ghost:
    "border border-gold-500/50 text-gold-400 hover:bg-gold-500 hover:text-navy-950",
  "primary-paper":
    "bg-gold-600 text-navy-950 hover:-translate-y-0.5 hover:bg-gold-500",
  "secondary-paper":
    "border border-paper-300 bg-paper-100 text-slate-700 hover:-translate-y-0.5 hover:border-gold-600",
  "ghost-paper":
    "border border-gold-600/50 text-slate-700 hover:bg-gold-500 hover:border-gold-500 hover:text-navy-950",
} as const;

const base =
  "inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300";

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: keyof typeof styles;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  children,
  className = "",
  ...rest
}: {
  variant?: keyof typeof styles;
  arrow?: boolean;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

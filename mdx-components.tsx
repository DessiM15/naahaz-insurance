import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Typography for MDX prose. Applied globally to every post so the styling
 * lives in one place rather than being repeated as utility classes in each
 * file — which also keeps the .mdx files readable as plain writing.
 *
 * Set for the Broadsheet: posts render on the bone ground, so the prose is
 * slate on paper rather than the old light-on-navy.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-14 text-h3 font-semibold text-slate-700">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-[1.25rem] font-semibold text-slate-700">{children}</h3>
    ),
    p: ({ children }) => <p className="mt-6 text-slate-700/85">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-6 space-y-3 text-slate-700/85">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-slate-700/85 marker:text-gold-600">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-full before:bg-gold-600 [ol_&]:pl-0 [ol_&]:before:hidden">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-700">{children}</strong>
    ),
    em: ({ children }) => <em className="accent-word-paper not-italic italic">{children}</em>,
    hr: () => <hr className="rule-paper mt-14 border-0" />,
    /* Gold measures 3.11:1 on paper and fails AA as body text, so the link is
       slate and the gold survives as the underline, which carries no contrast
       requirement. Same rule as components/ui/tone.ts. */
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="inline-link text-slate-700 underline decoration-gold-600/50 underline-offset-4 transition-colors hover:decoration-gold-600"
      >
        {children}
      </Link>
    ),
    ...components,
  };
}

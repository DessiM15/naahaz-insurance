import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Typography for MDX prose. Applied globally to every post so the styling
 * lives in one place rather than being repeated as utility classes in each
 * file — which also keeps the .mdx files readable as plain writing.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-14 text-h3 font-semibold text-ink-50">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-[1.25rem] font-semibold text-ink-50">{children}</h3>
    ),
    p: ({ children }) => <p className="mt-6 text-ink-300">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-6 space-y-3 text-ink-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-ink-300 marker:text-gold-500">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-full before:bg-gold-500 [ol_&]:pl-0 [ol_&]:before:hidden">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink-50">{children}</strong>
    ),
    em: ({ children }) => <em className="accent-word not-italic italic">{children}</em>,
    hr: () => <hr className="rule-hairline mt-14 border-0" />,
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="inline-link text-gold-400 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:decoration-gold-500"
      >
        {children}
      </Link>
    ),
    ...components,
  };
}

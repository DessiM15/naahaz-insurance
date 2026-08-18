import type { ReactNode } from "react";

/**
 * Renders a headline string where {braced words} become the italic serif
 * gold accent. Keeps the accent decision inside the content data rather than
 * scattered through JSX.
 */
export function accentize(text: string): ReactNode[] {
  return text.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <span key={i} className="accent-word">
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

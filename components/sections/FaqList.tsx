/**
 * FAQ list.
 *
 * Native details and summary so every answer is in the HTML on first paint.
 * If an answer only exists after a click it cannot be quoted by an AI
 * overview and it cannot win a featured snippet, which for a YMYL insurance
 * site is most of the point of writing them.
 */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y" style={{ borderColor: "var(--c-hairline)" }}>
      {items.map((f) => (
        <details key={f.q} className="group py-6" style={{ borderColor: "var(--c-hairline)" }}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-[1.05rem] font-medium leading-snug marker:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-xl leading-none transition-transform duration-300 group-open:rotate-45"
              style={{ color: "var(--c-accent-deep)" }}
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed" style={{ color: "var(--c-ink-soft)" }}>
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

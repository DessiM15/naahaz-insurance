import { tone, type Tone } from "./tone";

/**
 * Section label.
 *
 * The dash stays gold on every surface — it is decoration, so it carries no
 * contrast requirement. The words do not: gold text fails AA on paper, so
 * there it drops to slate.
 */
export function Eyebrow({
  children,
  className = "",
  surface = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  surface?: Tone;
}) {
  const t = tone[surface];
  return (
    <p className={`flex items-center gap-4 text-eyebrow font-medium uppercase ${t.eyebrow} ${className}`}>
      <span
        className={`h-px w-10 shrink-0 ${surface === "paper" ? "bg-gold-600" : "bg-gold-500"}`}
        aria-hidden
      />
      {children}
    </p>
  );
}

import { disclaimers } from "@/content/copy";
import type { Tone } from "@/components/ui/tone";

/**
 * Required by CMS marketing rules for anyone selling Medicare Advantage or
 * Part D. Not present on the client's current site.
 *
 * TODO(client): confirm the exact wording with his compliance contact.
 */
export function MedicareDisclaimer({ surface = "dark" }: { surface?: Tone }) {
  const box =
    surface === "paper"
      ? "border-gold-600/25 bg-paper-200 text-slate-500"
      : "border-gold-500/20 bg-navy-800/50 text-ink-500";

  return (
    <div className="container-content py-10">
      <p className={`rounded-2xl border p-6 text-[0.8rem] leading-relaxed ${box}`}>
        {disclaimers.medicare}
      </p>
    </div>
  );
}

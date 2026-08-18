import { disclaimers } from "@/content/copy";

/**
 * Required by CMS marketing rules for anyone selling Medicare Advantage or
 * Part D. Not present on the client's current site.
 *
 * TODO(client): confirm the exact wording with his compliance contact.
 */
export function MedicareDisclaimer() {
  return (
    <div className="container-content py-10">
      <p className="rounded-2xl border border-gold-500/20 bg-navy-800/50 p-6 text-[0.8rem] leading-relaxed text-ink-500">
        {disclaimers.medicare}
      </p>
    </div>
  );
}

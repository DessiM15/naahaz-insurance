import type { MarkId, WordmarkConceptId } from "@/lib/brand";
import { MARK_GEOMETRY } from "./marks";
import { WORDMARK_GEOMETRY } from "./wordmark";

/**
 * Which logo is wired into the live site.
 *
 * Change this one object and the header, the loading screen, the footer and
 * the favicon all follow. Everything else reads from here.
 */
export type ActiveLogo =
  | { kind: "wordmark"; id: WordmarkConceptId }
  | { kind: "mark"; id: MarkId };

export const ACTIVE_LOGO: ActiveLogo = { kind: "wordmark", id: "wordmark-bars" };

/** Geometry for whatever is active — used by the loading screen's path draw. */
export function activeGeometry() {
  return ACTIVE_LOGO.kind === "wordmark"
    ? WORDMARK_GEOMETRY[ACTIVE_LOGO.id]
    : MARK_GEOMETRY[ACTIVE_LOGO.id];
}

import { buildIndex, search, CONFIDENCE_FLOOR, type Doc } from "./index-build";

/**
 * The answering engine, behind an interface.
 *
 * Today this is entirely scripted and costs nothing to run. When the client
 * decides to pay for AI, an LlmEngine implementing the same interface drops in
 * and nothing else on the site changes.
 */

export type Answer = {
  /** What Ava says. */
  text: string;
  /** Pages worth offering alongside the answer. */
  links: { label: string; href: string }[];
  /** True when we could not answer confidently — triggers the handoff offer. */
  uncertain: boolean;
};

export interface ChatEngine {
  readonly name: string;
  ask(question: string): Promise<Answer>;
}

class ScriptedEngine implements ChatEngine {
  readonly name = "scripted";
  private docs: Doc[] = buildIndex();

  async ask(question: string): Promise<Answer> {
    const hits = search(question, this.docs, 3);
    const best = hits[0];

    if (!best || best.score < CONFIDENCE_FLOOR) {
      // Offer the closest pages anyway — a weak match is still a better
      // starting point than a dead end. Fall back to the headline services
      // when nothing scored at all.
      const suggestions: Doc[] = hits.length
        ? hits.map((h) => h.doc)
        : this.docs.filter((d) => d.kind === "service").slice(0, 3);

      return {
        text: "I'm not sure about that one — and I'd rather not guess. These might be close:",
        links: suggestions.map((d) => ({ label: d.title, href: d.href })),
        uncertain: true,
      };
    }

    return {
      text: best.doc.answer,
      links: dedupe([
        { label: linkLabel(best.doc), href: best.doc.href },
        ...hits.slice(1, 3).map((h) => ({ label: linkLabel(h.doc), href: h.doc.href })),
      ]),
      uncertain: false,
    };
  }
}

/**
 * Several FAQs live on the same service page, so an unfiltered hit list can
 * offer the same URL three times. Keep the first occurrence of each href.
 */
function dedupe(links: { label: string; href: string }[]) {
  const seen = new Set<string>();
  return links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)));
}

/**
 * A FAQ's title is a question, which reads badly as a link. Point at the page
 * it lives on instead.
 */
function linkLabel(doc: Doc) {
  if (doc.kind === "faq") {
    const service = doc.href.split("/")[2]?.split("#")[0];
    const name = service
      ? service.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Read more";
    return `Read more about ${name}`;
  }
  return `Read more about ${doc.title}`;
}

/**
 * TODO(upsell): an LlmEngine goes here. It would take the same index as
 * grounding context, call the model, and return the same Answer shape. Nothing
 * in components/chat/Ava.tsx would need to change.
 */

export function getChatEngine(): ChatEngine {
  return new ScriptedEngine();
}

import { SERVICES } from "@/content/services";
import { clientCopy } from "@/content/copy";

/**
 * The searchable content index.
 *
 * Derived from the same content that renders the pages, so the bot can never
 * drift out of sync with the site — there is no second copy to maintain.
 */

export type Doc = {
  id: string;
  title: string;
  href: string;
  /** Short answer the bot speaks aloud. */
  answer: string;
  /** Everything searchable, lowercased at build time. */
  haystack: string;
  kind: "service" | "faq" | "page";
};

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function buildIndex(): Doc[] {
  const docs: Doc[] = [];

  for (const s of SERVICES) {
    docs.push({
      id: `svc:${s.slug}`,
      title: s.name,
      href: `/services/${s.slug}`,
      answer: s.lede,
      haystack: norm([s.name, s.short, s.lede, s.intro, ...s.offerings.map((o) => `${o.title} ${o.body}`), ...s.whoFor].join(" ")),
      kind: "service",
    });

    for (const [i, f] of s.faqs.entries()) {
      docs.push({
        id: `faq:${s.slug}:${i}`,
        title: f.q,
        href: `/services/${s.slug}#faq`,
        answer: f.a,
        haystack: norm(`${f.q} ${f.a} ${s.name} ${s.short}`),
        kind: "faq",
      });
    }
  }

  docs.push(
    {
      id: "page:about",
      title: "About NAAHAZ INSURANCE",
      href: "/about",
      answer: clientCopy.aboutIntro,
      haystack: norm(`about naahaz naureen aziz ali team who we are our story mission ${clientCopy.aboutIntro} ${clientCopy.mission}`),
      kind: "page",
    },
    {
      id: "page:contact",
      title: "Contact & office",
      href: "/contact",
      answer:
        "Our office is at 5105 Tollview Dr Suite #112, Rolling Meadows, IL 60008. You can call us, send a message through the site, or book a time that suits you.",
      haystack: norm("contact phone number email address office location directions rolling meadows illinois hours where are you"),
      kind: "page",
    },
    {
      id: "page:book",
      title: "Book a strategy call",
      href: "/book",
      answer:
        "You can book a free consultation directly — pick a service, tell us when suits you, and we'll confirm.",
      haystack: norm("book booking appointment schedule meeting consultation call strategy time slot"),
      kind: "page",
    },
    {
      id: "page:cost",
      title: "What does it cost to work with you?",
      href: "/contact",
      answer:
        "The initial consultation is free. For most insurance products we're compensated by the carriers, so our help costs you the same as going direct — with the difference that someone reviews the details with you first.",
      haystack: norm("cost price fee charge how much free consultation commission paid expensive"),
      kind: "faq",
    },
  );

  return docs;
}

/** Words too common to carry meaning in a search this small. */
const STOP = new Set([
  "the","a","an","is","are","do","does","did","i","my","me","you","your","we","our","it","of","for","to","in","on",
  "and","or","but","what","how","when","why","can","should","would","if","with","about","that","this","have","has",
  "get","need","want","am","be","been","was","were","will","there","their","them","they","at","from","as","so","not",
]);

export function tokenize(q: string): string[] {
  return norm(q).split(" ").filter((t) => t.length > 2 && !STOP.has(t));
}

export type Hit = { doc: Doc; score: number };

/**
 * Scores documents by term overlap, weighting title matches heavily.
 * Deliberately simple — it is a site search, not a search engine.
 */
export function search(query: string, docs: Doc[], limit = 3): Hit[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const hits: Hit[] = [];

  for (const doc of docs) {
    const title = norm(doc.title);
    let score = 0;

    for (const t of terms) {
      if (title.includes(t)) score += 6;
      const matches = doc.haystack.split(t).length - 1;
      if (matches > 0) score += Math.min(matches, 4) * 2;
    }

    // FAQs answer questions better than landing pages do.
    if (doc.kind === "faq") score *= 1.25;

    if (score > 0) hits.push({ doc, score: score / terms.length });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Below this, the bot says it isn't sure rather than guessing. In a regulated
 * industry a confident wrong answer is worse than an honest "I don't know".
 */
export const CONFIDENCE_FLOOR = 5;

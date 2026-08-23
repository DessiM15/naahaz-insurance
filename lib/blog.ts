/**
 * Blog registry.
 *
 * Posts are MDX files under content/blog. The loader is an explicit import
 * rather than a template literal so the bundler can see every post statically
 * and the whole blog stays prerenderable.
 *
 * Adding a post: drop the .mdx file in, add an entry here. That's the whole
 * workflow. If the client would rather write posts himself in a browser, a CMS
 * is a phase-three conversation.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date. */
  published: string;
  image: string;
  imageAlt: string;
  tag: string;
  /** Related service page. */
  service: string;
  /** Word count of the .mdx body, tags stripped. Feeds the reading time.
      Recount when the post is edited: `sed -e 's/<[^>]*>//g' file.mdx | wc -w`. */
  words: number;
  load: () => Promise<{ default: React.ComponentType }>;
};

export const POSTS: Post[] = [
  {
    slug: "9-important-medicare-mistakes-to-avoid",
    title: "9 Important Medicare Mistakes to Avoid",
    description:
      "The nine Medicare mistakes we see most often — from missed enrollment windows and permanent penalties to assuming it covers long-term care.",
    published: "2026-06-18",
    image: "/images/blog/medicare-mistakes.jpg",
    imageAlt: "An older woman smiling warmly",
    tag: "Medicare",
    service: "medicare",
    words: 555,
    load: () => import("@/content/blog/9-important-medicare-mistakes-to-avoid.mdx"),
  },
  {
    slug: "is-your-income-protected-if-you-become-disabled",
    title: "Is Your Income Protected if You Become Disabled?",
    description:
      "Your ability to earn is probably your largest asset, and the most commonly uninsured one. What group coverage actually pays, and where it falls short.",
    published: "2026-05-02",
    image: "/images/blog/disability-income.jpg",
    imageAlt: "A business owner in an apron checking their phone",
    tag: "Disability Income",
    service: "income-strategies",
    words: 450,
    load: () => import("@/content/blog/is-your-income-protected-if-you-become-disabled.mdx"),
  },
  {
    slug: "creditor-protection-in-retirement-planning",
    title: "Creditor Protection in Retirement Planning",
    description:
      "Two accounts holding identical investments can carry very different exposure to creditors. Why the structure of retirement savings matters, not just the balance.",
    published: "2026-03-14",
    image: "/images/blog/creditor-protection.jpg",
    imageAlt: "A detail of a glass building facade",
    tag: "Retirement Planning",
    service: "retirement-planning",
    words: 522,
    load: () => import("@/content/blog/creditor-protection-in-retirement-planning.mdx"),
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Rough reading time from the post's own word count, set at authoring time. */
export const READING_WORDS_PER_MINUTE = 220;

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / READING_WORDS_PER_MINUTE));
}

/** Every tag in use, most-used first. Drives the topic filter on /blog. */
export function allTags() {
  const counts = new Map<string, number>();
  for (const p of POSTS) counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
}

/** The shape the client-side archive needs — everything except the loader. */
export type PostCard = Omit<Post, "load">;

export function toCard({ load: _load, ...rest }: Post): PostCard {
  return rest;
}

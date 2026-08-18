import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/*
        Phase 1 ships the hero, the design system, the loader and the scroll
        behaviour. The remaining homepage sections — the 3-step process, the
        services grid, testimonials and the lead form — land in phase 2 once
        the logo concept and visual direction are signed off.
      */}
      <section className="container-content py-32">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-gold-400">
          Phase 1 · Foundation
        </p>
        <h2 className="mt-6 max-w-3xl text-h2 font-semibold text-ink-50">
          Design system, loading screen and scroll behaviour are in.{" "}
          <span className="accent-word">Sections come next.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lead text-ink-300">
          Review the four logo directions, then the rest of the site gets built on
          whichever one you pick.
        </p>
        <a
          href="/logo-concepts"
          className="mt-9 inline-flex items-center gap-3 rounded-full border border-gold-500/50 px-8 text-base font-medium text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-navy-950"
        >
          View the four logo concepts
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Drives a curtain opener from scroll position.
 *
 * Publishes one number on the root element: 0 with the panels closed, 1 with
 * them fully parted. Everything visual reads from it in CSS, so there is a
 * single source of truth and no chance of the panels, the seam and the header
 * disagreeing with each other.
 *
 * Progress is measured against the hero's scroll track, so it is tied to the
 * layout rather than to a hardcoded pixel count, and it stays correct on a
 * phone, on a short laptop window and after an orientation change.
 *
 * The idle fallback is the part that matters. A curtain that only opens on
 * scroll strands anyone who lands and reads without scrolling, and the brief
 * is explicit that nothing may delay access to information. So if there has
 * been no scroll for a few seconds, it opens itself. Anyone who does scroll
 * gets the scroll driven parting and never sees the fallback fire.
 *
 * Both concepts use this. They differ only in which variable they publish and
 * which track they measure, which keeps the two openers visually distinct
 * without duplicating the mechanism.
 */
const IDLE_MS = 3800;
const AUTO_MS = 1100;

export function CurtainScroll({
  cssVar = "--bc",
  trackAttr = "data-bc-track",
  skipAttr = "data-brandcurtain",
}: {
  /** Custom property this instance publishes, read by the panel CSS. */
  cssVar?: string;
  /** Attribute marking the scroll track the hero is pinned inside. */
  trackAttr?: string;
  /** Root attribute the boot script sets when the opener is skipped. */
  skipAttr?: string;
} = {}) {
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute(skipAttr) === "skip") return;

    const track = document.querySelector<HTMLElement>(`[${trackAttr}]`);
    if (!track) return;

    let raf = 0;
    let idle = 0;
    let auto: number | null = null;
    let scrolled = false;

    const set = (p: number) => root.style.setProperty(cssVar, String(p));

    const fromScroll = () => {
      // Distance the sticky hero can travel inside its own track.
      const travel = track.offsetHeight - window.innerHeight;
      const start = track.offsetTop;
      const p = travel > 0 ? (window.scrollY - start) / travel : 1;
      set(Math.min(1, Math.max(0, p)));
    };

    /** The idle fallback. Eases the same variable, so nothing else changes. */
    const openSelf = () => {
      if (scrolled) return;
      const from = parseFloat(getComputedStyle(root).getPropertyValue(cssVar)) || 0;
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / AUTO_MS);
        // Same curve the scroll parting uses, so the two feel identical.
        const eased = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        set(from + (1 - from) * eased);
        if (k < 1 && !scrolled) auto = requestAnimationFrame(step);
      };
      auto = requestAnimationFrame(step);
    };

    const onScroll = () => {
      if (!scrolled && window.scrollY > 4) {
        scrolled = true;
        window.clearTimeout(idle);
        if (auto) cancelAnimationFrame(auto);
      }
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        fromScroll();
      });
    };

    fromScroll();
    idle = window.setTimeout(openSelf, IDLE_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
      if (auto) cancelAnimationFrame(auto);
      root.style.removeProperty(cssVar);
    };
  }, [cssVar, trackAttr, skipAttr]);

  return null;
}

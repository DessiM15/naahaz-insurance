"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll behaviour, per spec:
 *
 *   Refresh / hard load  →  always land at the top. Never dump someone into
 *                           the middle of a page they just reloaded.
 *   Forward navigation   →  top.
 *   Back / forward       →  restore where they were, like a normal browser.
 *   #anchor links        →  still jump to the element. That's intentional,
 *                           not an accident of restoration.
 *
 * The browser's own scroll restoration is disabled by the inline script in
 * app/layout (`history.scrollRestoration = 'manual'`) because it fires on
 * refresh, which is exactly the behaviour we're removing. We re-implement the
 * half we want. That line used to live in the loader's boot script; when the
 * loader was dropped for the Broadsheet it was kept, because this depends on
 * it — without it, a refresh restores mid-page and fights the rule below.
 */

const KEY = "naahaz:scroll:";
const SAVE_THROTTLE_MS = 200;

export function ScrollManager() {
  const pathname = usePathname();
  const isPopRef = useRef(false);
  const firstRunRef = useRef(true);

  // Track back/forward so the route effect below knows which rule applies.
  useEffect(() => {
    const onPop = () => {
      isPopRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Record scroll position per route, throttled, for back/forward restore.
  useEffect(() => {
    let timer: number | undefined;
    const save = () => {
      if (timer) return;
      timer = window.setTimeout(() => {
        timer = undefined;
        try {
          sessionStorage.setItem(KEY + pathname, String(window.scrollY));
        } catch {
          /* private mode — restoration is a nicety, not a requirement */
        }
      }, SAVE_THROTTLE_MS);
    };

    window.addEventListener("scroll", save, { passive: true });
    return () => {
      window.removeEventListener("scroll", save);
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname]);

  // Apply the right rule on every route change and on first load.
  useEffect(() => {
    const hash = window.location.hash;
    const isPop = isPopRef.current;
    const isFirstRun = firstRunRef.current;
    isPopRef.current = false;
    firstRunRef.current = false;

    // An explicit #anchor always wins — someone asked for that spot.
    if (hash && hash.length > 1) {
      const el = document.querySelector(hash);
      if (el) {
        // Wait a frame so layout has settled before measuring.
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: isFirstRun ? "auto" : "smooth", block: "start" }),
        );
        return;
      }
    }

    // Back / forward — put them back where they were.
    if (isPop && !isFirstRun) {
      const saved = Number(sessionStorage.getItem(KEY + pathname) ?? 0);
      requestAnimationFrame(() => window.scrollTo(0, saved));
      return;
    }

    // Everything else — refresh, hard load, forward navigation — goes to top.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

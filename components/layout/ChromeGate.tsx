"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The concept routes are self-contained design worlds. Each one carries its
 * own header, footer, palette and type, so the navy site chrome must not
 * render around them.
 *
 * This is deliberately a gate rather than a second root layout: a second root
 * layout would mean moving every existing page into a route group, and the
 * concepts are a presentation artefact that will be deleted once the client
 * picks one. Keeping the surgery shallow keeps it cheap to reverse.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/concepts")) return null;
  return <>{children}</>;
}

/** True on the concept routes. Lets the loader and scroll manager bow out too. */
export function useIsConcept() {
  const pathname = usePathname();
  return Boolean(pathname?.startsWith("/concepts"));
}

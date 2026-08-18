"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookingFlow } from "./BookingFlow";

/**
 * The same flow as /book, opened in place so nobody loses their spot on the
 * page. /book still exists as a real, indexable URL for business cards, email
 * signatures and the Google Business "Book" button.
 */
export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-navy-950/85 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Book a strategy call"
        >
          <motion.div
            className="relative my-auto w-full max-w-2xl"
            initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-h3 font-semibold text-ink-50">Book a Strategy Call</h2>
                <p className="mt-1.5 text-[0.9rem] text-ink-500">
                  Free, no obligation.{" "}
                  <Link href="/book" onClick={onClose} className="inline-link underline decoration-gold-500/40 underline-offset-4 hover:text-gold-400">
                    Open as a page
                  </Link>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-600 text-ink-300 transition-colors hover:border-gold-500/60 hover:text-ink-50"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <BookingFlow compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoLink } from "@/components/logo/Logo";
import { site } from "@/lib/site";

/**
 * Sticky header. Transparent over the hero, then settles into a blurred navy
 * bar once the user scrolls past it — carried over from the Valor reference,
 * along with the persistent booking CTA.
 */

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-navy-700/70 bg-navy-900/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-content flex items-center justify-between py-4">
          <LogoLink />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center text-[0.95rem] text-ink-300 transition-colors duration-300 hover:text-ink-50"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-500 transition-all duration-400 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
              className="hidden items-center text-[0.95rem] text-ink-300 transition-colors hover:text-gold-400 xl:inline-flex"
            >
              {site.contact.phonePrimary}
            </a>

            <Link
              href="/book"
              className="hidden items-center rounded-full bg-gold-500 px-6 text-[0.9rem] font-semibold tracking-wide text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_32px_-6px_var(--color-gold-500)] sm:inline-flex"
            >
              Book a Strategy Call
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex w-12 items-center justify-center lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink-50 transition-all duration-300 ${
                    open ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-px w-6 bg-ink-50 transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink-50 transition-all duration-300 ${
                    open ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-950/97 backdrop-blur-2xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-content flex h-full flex-col justify-center gap-2"
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center border-b border-navy-700/60 py-5 text-h3 text-ink-50"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 font-semibold text-navy-950"
                >
                  Book a Strategy Call
                </Link>
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                  className="inline-flex items-center justify-center rounded-full border border-navy-600 px-7 text-ink-300"
                >
                  {site.contact.phonePrimary}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

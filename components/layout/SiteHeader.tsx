"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoLink } from "@/components/logo/Logo";
import { site } from "@/lib/site";
import { BookingModal } from "@/components/booking/BookingModal";

/**
 * Sticky header, in the Broadsheet.
 *
 * Transparent over the hero so the film runs edge to edge with no bar cutting
 * across the top of it, then takes the paper ground once the visitor scrolls
 * past. Every colour comes from the --c-* tokens published by the [data-brand]
 * wrapper in app/layout, so this one component is correct on the bone homepage
 * and on the navy pages that have not been converted yet.
 *
 * Square corners and uppercase tracking rather than the pill button the navy
 * build used: the Broadsheet has no radius anywhere in it.
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
  const [booking, setBooking] = useState(false);

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

  /* Which routes are dark behind the header at scroll zero.
     
     This used to assume every page was navy, which was true when the header
     was written and false the moment the inner pages went bone: the header
     kept painting near-white #f4efe4 ink onto a #f7f4ed ground, so the logo,
     the nav and the phone number were all invisible until you scrolled.
     
     Only the homepage's film and the booking page are dark now. Everywhere
     else opens on a masthead, so the ink is dark from the first pixel. */
  const pathname = usePathname();
  const darkBehind = pathname === "/" || pathname === "/book";
  const onPaper = scrolled || !darkBehind;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
        style={{
          background: onPaper ? "var(--c-ground)" : "transparent",
          borderBottomColor: onPaper ? "var(--c-hairline)" : "transparent",
          color: onPaper ? "var(--c-ink)" : "var(--c-on-deep)",
        }}
      >
        {/* The Broadsheet grid is 1440, not the 1280 container-content the
            navy build used. The header has to share it or the wordmark sits
            inset from the content edge of every section below it. */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
          <LogoLink />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center text-[0.82rem] tracking-wide opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-400 group-hover:w-full"
                  style={{ background: "var(--c-accent)" }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
              className="hidden items-center text-[0.82rem] tracking-wide opacity-80 transition-opacity hover:opacity-100 xl:inline-flex"
            >
              {site.contact.phonePrimary}
            </a>

            <button
              type="button"
              onClick={() => setBooking(true)}
              className="hidden items-center px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
              style={{
                background: onPaper ? "var(--c-deep)" : "var(--c-accent)",
                color: onPaper ? "var(--c-on-deep)" : "#0e1b2e",
              }}
            >
              Book a call
            </button>

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
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
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
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "var(--c-ground)", color: "var(--c-ink)" }}
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center gap-2 px-6 lg:px-10"
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
                    className="c-display flex items-center border-b py-5 text-[1.9rem]"
                    style={{ borderColor: "var(--c-hairline)" }}
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
                <button
                  type="button"
                  onClick={() => { setOpen(false); setBooking(true); }}
                  className="inline-flex items-center justify-center px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "var(--c-deep)", color: "var(--c-on-deep)" }}
                >
                  Book a call
                </button>
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                  className="inline-flex items-center justify-center border px-7 py-4 text-[0.82rem]"
                  style={{ borderColor: "var(--c-hairline)", color: "var(--c-ink-soft)" }}
                >
                  {site.contact.phonePrimary}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}

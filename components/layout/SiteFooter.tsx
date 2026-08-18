import Link from "next/link";
import { Logo } from "@/components/logo/Logo";
import { SERVICES_SORTED } from "@/content/services";
import { disclaimers } from "@/content/copy";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { address } = site.contact;

  return (
    <footer className="rule-hairline mt-32 bg-navy-950">
      <div className="container-content py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo variant="full" />
            <p className="mt-7 max-w-xs text-[0.95rem] text-ink-500">
              {site.tagline}. Insurance and financial services for individuals,
              families and businesses across Illinois.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Services</h2>
            <ul className="mt-6 space-y-3">
              {SERVICES_SORTED.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-link text-[0.93rem] text-ink-300 transition-colors hover:text-gold-400"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Company</h2>
            <ul className="mt-6 space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "All services" },
                { href: "/blog", label: "News & resources" },
                { href: "/contact", label: "Contact" },
                { href: "/book", label: "Book a call" },
                { href: "/privacy", label: "Privacy policy" },
                { href: "/terms", label: "Terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-link text-[0.93rem] text-ink-300 transition-colors hover:text-gold-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-[0.18em] text-ink-500">Contact</h2>
            <address className="mt-6 space-y-3 text-[0.93rem] not-italic text-ink-300">
              <p>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </p>
              <p>
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                  className="inline-link transition-colors hover:text-gold-400"
                >
                  {site.contact.phonePrimary}
                </a>
                <br />
                <a
                  href={`tel:${site.contact.phoneSecondary.replace(/\D/g, "")}`}
                  className="inline-link transition-colors hover:text-gold-400"
                >
                  {site.contact.phoneSecondary}
                </a>
              </p>
            </address>

            <Link
              href="/book"
              className="mt-7 inline-flex items-center rounded-full bg-gold-500 px-6 text-[0.88rem] font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 space-y-4 border-t border-navy-800 pt-9 text-[0.78rem] leading-relaxed text-ink-500">
          <p>{disclaimers.general}</p>
          <p>{disclaimers.availability}</p>
          <p className="border-l-2 border-gold-500/30 pl-4">{disclaimers.medicare}</p>
          <p className="pt-2">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

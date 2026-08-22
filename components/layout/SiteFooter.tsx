import Link from "next/link";
import { Logo } from "@/components/logo/Logo";
import { SERVICES_SORTED } from "@/content/services";
import { disclaimers } from "@/content/copy";
import { site } from "@/lib/site";

/**
 * Site footer, in the Broadsheet.
 *
 * The dark block at the end of the page, which is the same role it plays in
 * the concept. Content is unchanged from the navy build on purpose: the
 * service list, the company links, the NAP block and all three disclaimers are
 * load bearing — the NAP has to stay identical to the LocalBusiness schema or
 * the local ranking signal is wasted, and the Medicare CMS disclaimer is a
 * marketing requirement rather than a design element.
 */
export function SiteFooter() {
  const { address } = site.contact;

  return (
    <footer className="on-deep">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo variant="full" />
            <p
              className="mt-7 max-w-xs text-[0.95rem] leading-relaxed"
              style={{ color: "var(--c-on-deep-soft)" }}
            >
              {site.tagline}. Insurance and financial services for individuals,
              families and businesses across Illinois.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              Services
            </h2>
            <ul className="mt-6 space-y-3">
              {SERVICES_SORTED.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-link text-[0.93rem] opacity-80 transition-opacity hover:opacity-100"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              Company
            </h2>
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
                    className="inline-link text-[0.93rem] opacity-80 transition-opacity hover:opacity-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — must stay identical to the LocalBusiness schema. */}
          <div>
            <h2 className="c-eyebrow" style={{ color: "var(--c-accent)" }}>
              Contact
            </h2>
            <address
              className="mt-6 space-y-3 text-[0.93rem] not-italic"
              style={{ color: "var(--c-on-deep-soft)" }}
            >
              <p>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </p>
              <p>
                <a
                  href={`tel:${site.contact.phonePrimary.replace(/\D/g, "")}`}
                  className="inline-link transition-opacity hover:opacity-70"
                >
                  {site.contact.phonePrimary}
                </a>
                <br />
                <a
                  href={`tel:${site.contact.phoneSecondary.replace(/\D/g, "")}`}
                  className="inline-link transition-opacity hover:opacity-70"
                >
                  {site.contact.phoneSecondary}
                </a>
              </p>
            </address>

            <Link
              href="/book"
              className="mt-7 inline-flex items-center px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--c-accent)", color: "#0e1b2e" }}
            >
              Book a call
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div
          className="mt-16 space-y-4 border-t pt-9 text-[0.78rem] leading-relaxed"
          style={{ borderColor: "var(--c-hairline)", color: "var(--c-on-deep-soft)" }}
        >
          <p>{disclaimers.general}</p>
          <p>{disclaimers.availability}</p>
          <p className="border-l-2 pl-4" style={{ borderColor: "var(--c-accent)" }}>
            {disclaimers.medicare}
          </p>
          <p className="pt-2">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

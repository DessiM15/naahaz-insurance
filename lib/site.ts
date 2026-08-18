/**
 * Single source of truth for site-wide constants.
 *
 * Canonical URL is env-driven so the domain decision (keep
 * yourhealthinsurance.net vs. move to a NAAHAZ domain) stays a one-line
 * change and never gets hardcoded into metadata, sitemap, or OG tags.
 */
export const site = {
  name: "NAAHAZ INSURANCE",
  shortName: "NAAHAZ",
  legalName: "NAAHAZ Inc.",
  tagline: "Protecting What Matters",
  description:
    "Get tailored insurance & financial solutions with NAAHAZ INC. Protect your assets & secure your future. Contact us for personalized service!",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yourhealthinsurance.net",
  locale: "en_US",

  contact: {
    // TODO(client): AZIZALI@INSURANCE.COM on the legacy site is almost
    // certainly a placeholder. Confirm before wiring any outbound email.
    email: "AZIZALI@INSURANCE.COM",
    emailVerified: false,
    // TODO(client): confirm which of the two numbers is primary.
    phonePrimary: "(773) 259-6908",
    phoneSecondary: "(773) 208-6287",
    address: {
      street: "5105 Tollview Dr Suite #112",
      city: "Rolling Meadows",
      region: "IL",
      postalCode: "60008",
      country: "US",
    },
  },

  founders: [
    { name: "Naureen Ali", role: "Co-Founder" },
    { name: "Aziz Ali", role: "Co-Founder" },
  ],
} as const;

export type Site = typeof site;

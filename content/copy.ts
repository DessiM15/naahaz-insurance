/**
 * Copy lifted verbatim from the client's live site.
 *
 * These strings are his existing SEO footprint and his voice. They are kept
 * exactly as written — do not "improve" them without his sign-off. Anything
 * we add around them should sound like it came from the same pen.
 *
 * Source: yourhealthinsurance.net, captured 2026-08-18.
 */
export const clientCopy = {
  h1: "Protecting What Matters",

  heroSub:
    "We are committed to safeguarding your assets, your loved ones, and your future with comprehensive insurance solutions, so you can live and work with confidence",

  mission:
    "Our Mission at NAAHAZ Insurance Agency is to empower individuals and businesses by providing tailored insurance and financial solutions that safeguard their future and support their growth.",

  whyChooseUs:
    "We offer more than just insurance and financial services—we provide peace of mind through personalized solutions that fit your unique needs.",

  aboutIntro:
    "We are a team of dedicated professionals focused on providing comprehensive insurance and financial services tailored to meet the unique needs of individuals, families, and businesses.",

  protectPhrase: "innovative strategies and comprehensive coverage that protect what matters most",

  values: "trust, transparency, and a deep understanding of the challenges you face",

  metaDescription:
    "Get tailored insurance & financial solutions with NAAHAZ INC. Protect your assets & secure your future. Contact us for personalized service!",
} as const;

/**
 * Disclaimers.
 *
 * The first two are his own, carried over verbatim. The Medicare one is NOT
 * currently on his site — CMS marketing rules require it for anyone selling
 * Medicare Advantage or Part D, so it ships here as a placeholder.
 *
 * TODO(client): all three need his attorney / compliance review before launch.
 */
export const disclaimers = {
  general:
    "This information is provided as general information and is not intended to be specific financial guidance.",

  availability:
    "Products or services mentioned may be unavailable in your state and/or unsuitable for some individuals.",

  advice:
    "Information provided is general guidance, not specific financial advice. We recommend consulting a financial, legal, or tax professional before making personal financial decisions.",

  /** Required by CMS for Medicare Advantage and Part D marketing. */
  medicare:
    "We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options. NAAHAZ INSURANCE is not connected with or endorsed by the United States government or the federal Medicare program.",
} as const;

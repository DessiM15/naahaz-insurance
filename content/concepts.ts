/**
 * Content shared by all four homepage concepts.
 *
 * The concepts differ in how they look, not in what they say, so the client is
 * comparing design rather than comparing copy. Anything a single concept needs
 * on its own lives in that concept's page file.
 *
 * Voice rule from the brief: write the phrase people type into Google over the
 * phrase that sounds clever. No dashes, no emojis, no punchy-for-punchy.
 */

import { clientCopy } from "./copy";

export const concepts = [
  {
    slug: "broadsheet",
    name: "The Broadsheet",
    line: "Warm bone, navy ink, antique gold",
    blurb:
      "Editorial and established. Full bleed photography, a classic serif, and almost no ornament. The closest relative of the reference site your advisor rated highest.",
    type: "Playfair Display and Mulish",
    hero: "One continuous shot, no cuts",
    mode: "Light",
  },
  {
    slug: "atelier",
    name: "The Atelier",
    line: "Chalk white, near black navy, champagne",
    blurb:
      "Quiet and expensive. Very large type set very tight, enormous white space, and a video held inside the layout rather than behind it. The most modern of the four.",
    type: "Baskervville and Inter",
    hero: "One continuous shot, framed",
    mode: "Light",
  },
  {
    slug: "curtain",
    name: "The Curtain",
    line: "Cool paper against full brand navy",
    blurb:
      "The cinematic one. An opening curtain, headlines that arrive word by word, numbered chapters, and a four cut montage in the hero.",
    type: "Fraunces and Inter",
    hero: "Four cut montage",
    mode: "Light",
  },
  {
    slug: "institution",
    name: "The Institution",
    line: "The existing navy and gold, in the dark",
    blurb:
      "Your current brand carried forward at full strength. Here so the dark option can be judged against the light ones on screen instead of in the abstract.",
    type: "Instrument Serif and Geist",
    hero: "One continuous shot",
    mode: "Dark",
  },
] as const;

/** Verbatim from the client's live site. Do not rewrite without his sign off. */
export const verbatim = clientCopy;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Answers", href: "#answers" },
  { label: "About", href: "#about" },
] as const;

export const contact = {
  name: "NAAHAZ INSURANCE",
  legal: "NAAHAZ Inc.",
  street: "5105 Tollview Dr, Suite 112",
  city: "Rolling Meadows",
  region: "IL",
  postal: "60008",
  phone: "(773) 259-6908",
  phoneHref: "tel:+17732596908",
  phoneAlt: "(773) 208-6287",
  /* TODO(client): AZIZALI@INSURANCE.COM on the legacy site is almost certainly
     a placeholder. Nothing outbound is wired until Aziz confirms it. */
  email: "AZIZALI@INSURANCE.COM",
} as const;

/**
 * The service set, ordered by the priority in the brief: retirement and income
 * first, then the family protection lines, then property and business.
 */
export const services = [
  {
    slug: "retirement-planning",
    name: "Retirement Planning",
    n: "01",
    image: "/images/services/retirement-planning.jpg",
    alt: "An older couple sitting together at a kitchen table reviewing paperwork",
    line: "Turn what you saved into income that does not run out.",
    body: "We look at what you have, what you will need, and where the gap is. Then we build around it with annuities, rollovers and a withdrawal order that keeps the tax bill down.",
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    n: "02",
    image: "/images/services/life-insurance.jpg",
    alt: "A family of four together on the sofa in a sunlit living room",
    line: "If your income stopped tomorrow, your family keeps the house.",
    body: "Term for the years the mortgage and the kids are on the books. Permanent when there is an estate, a business or a special needs child in the picture. We will tell you which one you actually need.",
  },
  {
    slug: "medicare",
    name: "Medicare",
    n: "03",
    image: "/images/services/medicare.jpg",
    alt: "Grandparents sitting with their grandchildren, looking at a tablet together",
    line: "Turning 65, or already on Medicare and paying too much.",
    body: "Advantage, Supplement and Part D compared side by side, with the Illinois rules that most agents never mention. No cost to you. We are paid by the carrier, not by you.",
  },
  {
    slug: "income-strategies",
    name: "Income Strategies",
    n: "04",
    image: "/images/services/income-strategies.jpg",
    alt: "A man working through printed statements and a laptop at a kitchen table",
    line: "Income you can count on, in a market you cannot.",
    body: "Guaranteed and market linked income, laddered so a bad year early in retirement does not set the whole plan back.",
  },
  {
    slug: "long-term-care",
    name: "Long Term Care",
    n: "05",
    image: "/images/services/long-term-care.jpg",
    alt: "An adult holding an older relative's hands",
    line: "The bill that empties retirement accounts faster than anything else.",
    body: "Traditional long term care, hybrid life policies with a care rider, and what Medicare does and does not pay for. It pays for less than almost everyone assumes.",
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    n: "06",
    image: "/images/services/health-insurance.jpg",
    alt: "A patient talking with her doctor in a clinic exam room",
    line: "ACA plans, subsidies, and coverage between jobs.",
    body: "Marketplace plans for individuals and families, with an honest read on whether you qualify for a subsidy and what the real out of pocket looks like.",
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    n: "07",
    image: "/images/services/business-insurance.jpg",
    alt: "A small business owner at work in their shop",
    line: "Cover the business, and cover what happens if you are not in it.",
    body: "General liability, workers compensation, group benefits, and buy sell funding so a partner's death does not become a fight with their family.",
  },
  {
    slug: "property-casualty",
    name: "Home and Auto",
    n: "08",
    image: "/images/services/property-casualty.jpg",
    alt: "A suburban home on a quiet residential street",
    line: "Home, auto and umbrella, bundled and actually reviewed.",
    body: "Most people have not looked at their limits in a decade. We check them against what the house would now cost to rebuild.",
  },
] as const;

/**
 * The three step process. Kept from the earlier build because it tested well
 * and because a visitor who cannot picture the first meeting does not book one.
 */
export const process = [
  {
    n: "01",
    title: "A conversation, not a pitch",
    body: "Twenty minutes on the phone or at the Rolling Meadows office. You tell us what you have and what you are worried about. Nothing is sold in this meeting.",
  },
  {
    n: "02",
    title: "We shop it, you see the math",
    body: "We are independent, so we compare carriers rather than defend one. You get the options side by side, in writing, with the tradeoffs said out loud.",
  },
  {
    n: "03",
    title: "You decide, and we stay",
    body: "We handle the paperwork and the carrier. Then we review it with you every year, because the plan that fit at 58 is rarely the plan that fits at 66.",
  },
] as const;

/**
 * FAQs, chosen from what people actually type into Google, and answered in the
 * first sentence so the answer can be lifted whole into an AI overview or a
 * featured snippet. Every figure is sourced and dated. See `factsSource`.
 */
export const faqs = [
  {
    q: "How much does Medicare cost in 2026?",
    a: "In 2026 the standard Medicare Part B premium is $202.90 a month and the Part B deductible is $283 a year. The Part A hospital deductible is $1,736 per benefit period, and skilled nursing coinsurance is $217 a day for days 21 through 100. Most people pay nothing for Part A. Higher earners pay more for Part B through IRMAA, which is based on your tax return from two years ago.",
  },
  {
    q: "What is the Illinois Medigap birthday rule?",
    a: "Illinois lets anyone aged 65 to 75 who has a Medigap policy switch to another Medigap plan with equal or lesser benefits during a 45 day window each year that starts on their birthday, with no medical underwriting. Most states have no rule like this. It is the single most useful Medicare right in Illinois and most people have never been told about it.",
  },
  {
    q: "When can I change my Medicare plan?",
    a: "There are three main windows. The Annual Enrollment Period runs October 15 to December 7 and lets you change Medicare Advantage and Part D plans for coverage starting January 1. The Medicare Advantage Open Enrollment Period runs January 1 to March 31 and gives anyone already on an Advantage plan one switch. Your Initial Enrollment Period is the seven months around your 65th birthday.",
  },
  {
    q: "How much can I put into a 401(k) in 2026?",
    a: "The 2026 employee contribution limit is $24,500. If you are 50 or older you can add a catch up of $8,000, for $32,500 total. If you are between 60 and 63 the catch up is $11,250 instead. The IRA limit for 2026 is $7,500, with a $1,100 catch up at 50 and over.",
  },
  {
    q: "Do I need life insurance if I already have it through work?",
    a: "Usually yes. Group life through an employer is typically one or two times salary, which rarely covers a mortgage and years of income, and it ends the day you leave the job. A personal policy is priced on your health today and stays with you regardless of where you work.",
  },
  {
    q: "Does Medicare pay for a nursing home?",
    a: "Mostly no. Medicare covers up to 100 days in a skilled nursing facility after a qualifying hospital stay, and only days 1 through 20 are fully covered. Days 21 through 100 cost $217 a day in 2026. Long term custodial care, which is what most people mean by a nursing home, is not covered by Medicare at all. That is what long term care planning is for.",
  },
  {
    q: "How much is the estate tax exemption in 2026?",
    a: "The federal estate and gift tax exemption is $15 million per person for 2026, so a married couple can pass $30 million before federal estate tax applies. The annual gift tax exclusion is $19,000 per recipient. Illinois has its own separate estate tax with a much lower threshold, which is the part that catches Illinois families out.",
  },
  {
    q: "Do you charge for a review?",
    a: "No. There is no fee for a consultation or a policy review. On insurance and Medicare products we are paid by the carrier, and Medicare commissions are set by CMS, so the same plan costs you the same whether you buy it through us, through a call center, or direct.",
  },
] as const;

/**
 * Provenance for every number above. Rendered on the page, not just left in a
 * comment: insurance is a Your Money or Your Life category and Google holds it
 * to a higher bar, so the sources and the as of date are part of the design.
 */
export const factsSource = {
  asOf: "Current for the 2026 plan year. Reviewed August 2026.",
  sources: [
    { label: "CMS, 2026 Medicare Parts A and B premiums and deductibles", href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles" },
    { label: "IRS, 2026 retirement plan contribution limits", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
    { label: "Medicare.gov, enrollment periods", href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan" },
  ],
} as const;

/** Towns the agency writes business in. Feeds copy and LocalBusiness areaServed. */
export const areaServed = [
  "Rolling Meadows",
  "Arlington Heights",
  "Schaumburg",
  "Palatine",
  "Mount Prospect",
  "Des Plaines",
  "Elk Grove Village",
  "Hoffman Estates",
] as const;

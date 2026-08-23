/**
 * The service catalogue.
 *
 * Nine deep pages consolidated from the twenty-one URLs on the legacy site.
 * Everything a service page renders comes from here, so adding or reshaping a
 * page never means touching a template.
 *
 * `verbatim: true` on an offering means the wording is the client's own,
 * captured from his live site. Leave those alone.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Short label for nav and cards. */
  short: string;
  /** Sits above the headline. */
  eyebrow: string;
  /** Headline; the word wrapped in {} is set in italic serif gold. */
  headline: string;
  lede: string;
  image: string;
  imageAlt: string;
  /** Secondary image, used beside the "Is this you?" section. */
  detailImage: string;
  detailAlt: string;
  intro: string;
  offerings: { title: string; body: string; verbatim?: boolean }[];
  whoFor: string[];
  faqs: Faq[];
  /** Legacy URLs that 301 into this page. */
  legacy: string[];
  related: string[];
  /** Renders the CMS-required Medicare disclaimer. */
  medicareDisclaimer?: boolean;
  /** Sort weight — his priority business first. */
  weight: number;
};

export const SERVICES: Service[] = [
  {
    slug: "retirement-planning",
    name: "Retirement Planning",
    short: "Retirement",
    eyebrow: "Retirement Planning",
    headline: "A roadmap, not just a {balance}",
    lede: "Retirement planning goes beyond just saving — it's about creating a roadmap that ensures long-term financial stability and the ability to enjoy life after work.",
    image: "/images/services/retirement-planning.jpg",
    imageAlt: "A couple in their sixties at a kitchen table reviewing printed statements together",
    detailImage: "/images/detail/retirement-planning.jpg",
    detailAlt: "A couple walking hand in hand along a woodland path",
    intro:
      "Most people arrive with a number in mind and no plan attached to it. We start the other way around: what you want retirement to look like, what it will actually cost, and what has to be true for the money to last. Then we build toward it.",
    offerings: [
      {
        title: "Income source evaluation",
        body: "Social Security, pensions, savings and investments, mapped against what you'll actually need year by year — including the years before Medicare starts.",
        verbatim: true,
      },
      {
        title: "Risk assessment",
        body: "Inflation, healthcare costs and market fluctuations are the three things that quietly undo a retirement plan. We stress-test yours against all three.",
        verbatim: true,
      },
      {
        title: "Legacy and tax strategy",
        body: "Legacy planning, tax strategies and healthcare coverage, coordinated so they work together rather than against each other.",
        verbatim: true,
      },
      {
        title: "Social Security timing",
        body: "When you claim can swing lifetime benefits by six figures. We model the options against your health, your spouse's benefit and your other income.",
      },
    ],
    whoFor: [
      "You're within ten to fifteen years of retiring and want to know whether you're on track",
      "You have savings spread across several accounts and no single picture of them",
      "You're worried about healthcare costs before Medicare eligibility",
      "You want to leave something behind and keep the tax bill off your family",
    ],
    faqs: [
      {
        q: "When should I start retirement planning?",
        a: "Earlier is better, but the most valuable window is the ten to fifteen years before you stop working. That's when decisions about savings rate, asset mix, Social Security timing and healthcare coverage still have room to change the outcome. If you're already retired, planning shifts to making the money last — which is its own conversation, and one we have often.",
      },
      {
        q: "How much do I actually need to retire?",
        a: "There's no universal number, and any advisor who gives you one before asking about your life is guessing. It depends on your expected expenses, your other income sources, your health, how long you expect to be retired and what you want to leave behind. We build the estimate from your actual numbers rather than a rule of thumb.",
      },
      {
        q: "What happens to my healthcare before I turn 65?",
        a: "This is the gap that surprises people most. If you retire before Medicare eligibility you'll need coverage to bridge the years in between — usually an ACA marketplace plan, COBRA, or a spouse's employer plan. The cost is significant and needs to be built into the plan, not discovered afterward.",
      },
      {
        q: "Do you charge for a retirement review?",
        a: "The initial consultation is free. We'll look at where you stand, what's working and what isn't, and tell you plainly whether we can help. If we're not the right fit, we'll say so.",
      },
    ],
    legacy: ["/retirement-planning"],
    related: ["income-strategies", "long-term-care", "life-insurance"],
    weight: 1,
  },

  {
    slug: "income-strategies",
    name: "Income Strategies",
    short: "Income",
    eyebrow: "Income Strategies",
    headline: "Turning savings into a {paycheck}",
    lede: "Effective retirement income planning is essential for ensuring a secure and comfortable future through strategic asset and income management.",
    image: "/images/services/income-strategies.jpg",
    imageAlt: "A man working through printed statements and a laptop at a kitchen table",
    detailImage: "/images/detail/income-strategies.jpg",
    detailAlt: "Two people going through documents together at a table",
    intro:
      "Accumulating money and spending it down are different problems requiring different tools. The strategy that grew your savings is rarely the strategy that should distribute them. This is the part of the plan most people have never had built for them.",
    offerings: [
      {
        title: "Guaranteed income",
        body: "Annuity structures that produce income you cannot outlive, sized to cover your fixed costs so market swings never touch the essentials.",
      },
      {
        title: "Withdrawal sequencing",
        body: "Which account you draw from first changes your lifetime tax bill significantly. We map the order across taxable, tax-deferred and tax-free accounts.",
      },
      {
        title: "Alternative investments",
        body: "Options beyond the standard menu, for clients whose situation calls for them. We'll explain the trade-offs honestly, including the ones that argue against.",
      },
      {
        title: "Longevity planning",
        body: "Assessing current finances, retirement goals and expected expenses so the income holds up if you live considerably longer than average.",
        verbatim: true,
      },
    ],
    whoFor: [
      "You're approaching retirement and don't know how to turn savings into income",
      "You want a floor of guaranteed income underneath your essential expenses",
      "You're concerned about running out of money if you live into your nineties",
      "You want to reduce the tax drag on your withdrawals",
    ],
    faqs: [
      {
        q: "What is an annuity, in plain terms?",
        a: "A contract with an insurance company: you hand over a sum, and in exchange they pay you income — either for a set period or for the rest of your life. The appeal is that the payments don't stop when markets fall or when you outlive your projections. The trade-off is reduced flexibility and access to the principal. They suit some people well and others not at all, which is exactly what a consultation is for.",
      },
      {
        q: "Are annuities a good idea?",
        a: "For the right person, in the right size, for the right part of the plan — yes. As an all-or-nothing proposition — almost never. The honest answer depends on what else you have, what your fixed costs are, and how much certainty you need. Anyone who recommends one before understanding those things is selling, not advising.",
      },
      {
        q: "What are alternative investments?",
        a: "Assets outside traditional stocks, bonds and cash. They can offer diversification and different return patterns, but they typically carry less liquidity and more complexity. They aren't right for everyone, and we'd rather talk you out of one than into one that doesn't fit.",
      },
    ],
    legacy: ["/income-strategies", "/alternative-investments"],
    related: ["retirement-planning", "life-insurance", "long-term-care"],
    weight: 2,
  },

  {
    slug: "medicare",
    name: "Medicare",
    short: "Medicare",
    eyebrow: "Medicare",
    headline: "Medicare, made {understandable}",
    lede: "Navigating Medicare can be challenging, but we're here to help you make informed decisions with confidence.",
    image: "/images/services/medicare.jpg",
    imageAlt: "Grandparents on a porch with two grandchildren, all looking at a tablet together",
    detailImage: "/images/detail/medicare.jpg",
    detailAlt: "A doctor talking with a patient in a consulting room",
    intro:
      "Medicare has more moving parts than it needs to, and the enrollment deadlines are unforgiving. We sit down with you, work out what you actually need based on your doctors and your prescriptions, and handle the paperwork.",
    offerings: [
      {
        title: "Medicare Advantage (Part C)",
        body: "Combines Parts A and B with additional benefits like vision, dental, and prescription drug coverage, providing an all-in-one solution.",
        verbatim: true,
      },
      {
        title: "Medicare Supplement (Medigap)",
        body: "Offers additional coverage to help with out-of-pocket expenses, giving you peace of mind about unexpected healthcare costs.",
        verbatim: true,
      },
      {
        title: "Prescription Drug Plans (Part D)",
        body: "Essential for managing prescription expenses, we'll help you find a plan that covers your medications and works within your budget.",
        verbatim: true,
      },
      {
        title: "Annual plan review",
        body: "Plans change every year and so do your prescriptions. We review yours each fall during Open Enrollment so you don't quietly end up on the wrong one.",
      },
    ],
    whoFor: [
      "You're turning 65 in the next twelve months",
      "You're still working past 65 and unsure whether to enroll now",
      "You're already on Medicare but haven't reviewed the plan in years",
      "You're helping a parent make sense of their options",
    ],
    faqs: [
      {
        q: "When do I need to enroll in Medicare?",
        a: "Your Initial Enrollment Period runs seven months — the three months before the month you turn 65, that month, and the three months after. Missing it can mean permanent late-enrollment penalties on Part B and Part D. If you're still working and covered by an employer plan, the rules differ, which is worth a conversation before you assume either way.",
      },
      {
        q: "What's the difference between Medicare Advantage and Medigap?",
        a: "Medicare Advantage replaces Original Medicare with a private plan that usually bundles drug coverage and extras, within a network. Medigap works alongside Original Medicare to cover the out-of-pocket costs it leaves behind, and keeps you free to see any provider who accepts Medicare. Neither is universally better — it depends on your doctors, your prescriptions, your travel and your tolerance for network rules.",
      },
      {
        q: "Does Medicare cover long-term care?",
        a: "Largely no, and this is the most expensive misunderstanding in retirement. Medicare covers limited skilled nursing after a qualifying hospital stay. It does not cover extended custodial care — help with daily living — which is what most people actually end up needing. That's what long-term care coverage exists for.",
      },
      {
        q: "What does it cost to work with you on Medicare?",
        a: "Nothing. We're compensated by the carriers, so our help costs you the same as enrolling on your own — with the difference that someone reviews your prescriptions against the plan formularies before you commit.",
      },
    ],
    legacy: ["/medicarea485056e", "/medicare"],
    related: ["health-insurance", "long-term-care", "retirement-planning"],
    medicareDisclaimer: true,
    weight: 3,
  },

  {
    slug: "life-insurance",
    name: "Life Insurance & Estate Planning",
    short: "Life Insurance",
    eyebrow: "Life Insurance & Estate Planning",
    headline: "What you leave {behind}",
    lede: "Coverage that replaces your income, clears your debts, and gives the people who depend on you room to grieve without also worrying about money.",
    image: "/images/services/life-insurance.jpg",
    imageAlt: "A family of four together on the sofa in a sunlit living room",
    detailImage: "/images/detail/life-insurance.jpg",
    detailAlt: "A parent holding a young child",
    intro:
      "Life insurance is a promise you make to people who won't be in the room when it's kept. Getting the amount and the structure right matters more than the premium — and for many families it does double duty as an estate planning tool.",
    offerings: [
      {
        title: "Term life",
        body: "Straightforward coverage for a set period — usually while there's a mortgage to pay and children at home. The most protection per dollar, by a wide margin.",
      },
      {
        title: "Permanent life",
        body: "Whole and universal policies that stay in force for life and build cash value. Useful for estate liquidity and legacy goals, and more complex than term.",
      },
      {
        title: "Estate planning coordination",
        body: "Making sure the policy, the beneficiaries and the estate documents actually agree with one another. They frequently don't.",
      },
      {
        title: "Creditor protection",
        body: "Structuring so that what you intend for your family reaches your family. Life insurance carries protections many other assets don't.",
      },
    ],
    whoFor: [
      "Someone depends on your income — a spouse, children, a parent",
      "You have a mortgage or debts that would outlive you",
      "You own a business with a partner or key employee",
      "You have an estate large enough that taxes and liquidity are a real question",
    ],
    faqs: [
      {
        q: "How much life insurance do I need?",
        a: "Enough to replace your income for as long as your family needs it, clear your debts, and cover anything specific you've promised — a mortgage, college, a parent's care. Rules of thumb like 'ten times income' are a starting point, not an answer. We work it out from your actual obligations.",
      },
      {
        q: "Term or permanent?",
        a: "For most families with a mortgage and children at home, term does the job for a fraction of the cost. Permanent coverage earns its place when there's a lifelong need — estate liquidity, a special-needs dependent, a business buyout, or a legacy goal. Plenty of people are best served by term now and a conversation about permanent later.",
      },
      {
        q: "Can I get coverage with a health condition?",
        a: "Often, yes. Carriers price the same condition very differently, which is precisely where an independent agency helps — we can shop your situation rather than accept one company's verdict on it.",
      },
      {
        q: "Is life insurance taxable to my beneficiaries?",
        a: "The death benefit is generally income-tax-free to beneficiaries. Estate tax is a separate question and depends on how the policy is owned. That distinction is worth getting right before the policy is issued rather than after.",
      },
    ],
    legacy: ["/estate-planning", "/estate-planning3e451369", "/life-insurance-quick-quote", "/life-insurance"],
    related: ["retirement-planning", "long-term-care", "business-insurance"],
    weight: 4,
  },

  {
    slug: "long-term-care",
    name: "Long Term Care",
    short: "Long Term Care",
    eyebrow: "Long Term Care",
    headline: "The cost nobody {plans for}",
    lede: "Roughly seven in ten people over 65 will need some form of long-term care. Medicare doesn't cover it, and it is the single largest uninsured risk in most retirement plans.",
    image: "/images/services/long-term-care.jpg",
    imageAlt: "An adult holding both of an elderly parent's hands",
    detailImage: "/images/detail/long-term-care.jpg",
    detailAlt: "A nurse smiling with an older patient at home",
    intro:
      "This is the conversation people put off, and the one that most often undoes an otherwise sound retirement. Care costs are paid out of savings until the savings are gone. Planning for it early is dramatically cheaper than planning for it late.",
    offerings: [
      {
        title: "Traditional long-term care insurance",
        body: "Dedicated coverage for home care, assisted living and nursing care. Premiums are lowest when you're healthy and in your fifties or early sixties.",
      },
      {
        title: "Hybrid life and LTC policies",
        body: "A life policy with a long-term care rider. If you never need care, the death benefit still goes to your family — which answers the 'use it or lose it' objection.",
      },
      {
        title: "Care coordination planning",
        body: "Working out who would actually provide care, where, and what it would cost in your area — before it's an emergency decision made in a hospital corridor.",
      },
      {
        title: "Asset protection",
        body: "Structuring so a long care event doesn't consume the assets you intended for a spouse or for your children.",
      },
    ],
    whoFor: [
      "You're in your fifties or sixties and still in good health — the best time to qualify",
      "You watched a parent's care drain their savings and don't want to repeat it",
      "You have retirement assets worth protecting from a single long care event",
      "You want to spare your children the role of full-time caregiver",
    ],
    faqs: [
      {
        q: "Doesn't Medicare cover nursing homes?",
        a: "Only briefly, and only skilled care following a qualifying hospital stay — typically up to 100 days, with cost-sharing after the first 20. It does not cover custodial care, which is help with bathing, dressing, eating and moving around. Custodial care is what the overwhelming majority of people actually need, and it is paid out of pocket until assets are exhausted and Medicaid takes over.",
      },
      {
        q: "What does long-term care actually cost?",
        a: "In the Chicago area, assisted living and home health aides both run well into five figures annually, and skilled nursing considerably more. Costs have risen faster than general inflation for years. We'll walk through current local figures for your situation rather than national averages.",
      },
      {
        q: "What if I buy it and never need care?",
        a: "That's the objection to traditional policies, and it's fair. Hybrid policies exist precisely for it — they pay a death benefit to your family if care is never needed, so the premium isn't lost either way. It costs more up front and removes the 'wasted money' risk.",
      },
      {
        q: "Am I too old to qualify?",
        a: "It depends more on health than age. Underwriting tightens considerably after the mid-sixties and certain conditions make coverage unavailable. If it's on your mind, it's worth finding out where you stand now rather than assuming.",
      },
    ],
    legacy: ["/long-term-care"],
    related: ["medicare", "life-insurance", "retirement-planning"],
    weight: 5,
  },

  {
    slug: "health-insurance",
    name: "Health Insurance (ACA)",
    short: "Health / ACA",
    eyebrow: "Health Insurance",
    headline: "Coverage that fits your {actual life}",
    lede: "Individual and family health plans through the ACA marketplace — including the subsidies most people don't realise they qualify for.",
    image: "/images/services/health-insurance.jpg",
    imageAlt: "A patient talking with her doctor in a clinic exam room",
    detailImage: "/images/detail/health-insurance.jpg",
    detailAlt: "A healthcare worker going through information with a patient",
    intro:
      "Marketplace plans are genuinely hard to compare, and the differences that matter — whether your doctor is in network, whether your prescriptions are covered, what happens after the deductible — aren't the ones the website leads with. We compare on the things that will actually affect you.",
    offerings: [
      {
        title: "Marketplace plans",
        body: "Individual and family coverage across available carriers, compared on network, formulary and total expected cost rather than premium alone.",
      },
      {
        title: "Subsidy eligibility",
        body: "Premium tax credits and cost-sharing reductions are widely under-claimed. We check what you qualify for before you rule anything out on price.",
      },
      {
        title: "Retiree bridge coverage",
        body: "For anyone retiring before 65, coverage that bridges the gap until Medicare eligibility begins.",
      },
      {
        title: "Self-employed coverage",
        body: "Options for contractors, freelancers and business owners who don't have an employer plan behind them.",
      },
    ],
    whoFor: [
      "You don't have coverage through an employer",
      "You're self-employed or between jobs",
      "You're retiring before 65 and need to bridge to Medicare",
      "You're on a marketplace plan and have never had anyone check the subsidy math",
    ],
    faqs: [
      {
        q: "When can I enroll?",
        a: "Open Enrollment runs each autumn for coverage starting the following January. Outside that window you need a qualifying life event — losing job-based coverage, moving, marriage, divorce, or a new child — which opens a Special Enrollment Period, usually 60 days.",
      },
      {
        q: "Do I qualify for a subsidy?",
        a: "More people do than expect to, and eligibility extends much further up the income scale than it once did. It's based on household income and size relative to the federal poverty level. It takes a few minutes to check, and it's worth doing before you dismiss a plan as unaffordable.",
      },
      {
        q: "Does it cost more to use an agent?",
        a: "No. The premium is the same whether you enroll yourself or we do it with you. The difference is that we check your doctors against the network and your prescriptions against the formulary first.",
      },
    ],
    legacy: ["/health-insurance"],
    related: ["medicare", "long-term-care", "business-insurance"],
    weight: 6,
  },

  {
    slug: "business-insurance",
    name: "Business Insurance & Group Benefits",
    short: "Business",
    eyebrow: "Business Insurance & Group Benefits",
    headline: "Protect what you {built}",
    lede: "Coverage for the business itself, the people who run it, and the ones who'd have to keep it going without you.",
    image: "/images/services/business-insurance.jpg",
    imageAlt: "A shop owner working behind the counter of her hardware store",
    detailImage: "/images/detail/business-insurance.jpg",
    detailAlt: "Hand tools arranged on a workshop rack",
    intro:
      "Most small businesses are underinsured in one direction and overinsured in another, because coverage got added piece by piece as the business grew. We look at the whole picture and tell you where the actual exposure is.",
    offerings: [
      {
        title: "Group benefits",
        body: "Health, dental, vision, life and disability packages that help you compete for good people without pricing the business out.",
      },
      {
        title: "Workers' compensation",
        body: "Required in Illinois for nearly every employer. We'll make sure classification and payroll basis are right, since both drive the premium.",
      },
      {
        title: "Key person and buy-sell",
        body: "If the business would struggle without one specific person, that's an insurable risk. Buy-sell funding keeps ownership transitions from becoming disputes.",
      },
      {
        title: "General liability and property",
        body: "The foundational coverages, sized to what the business actually does rather than to a generic template.",
      },
    ],
    whoFor: [
      "You employ people in Illinois and need workers' compensation",
      "You want to offer benefits that help you retain staff",
      "You own the business with a partner and have no funded buy-sell agreement",
      "Your coverage has been renewed on autopilot for several years",
    ],
    faqs: [
      {
        q: "Do I need workers' compensation in Illinois?",
        a: "Almost certainly. Illinois requires it for essentially every employer, including for part-time staff, with narrow exceptions. Penalties for going without are substantial. If you're unsure whether a particular worker counts, that's worth a direct conversation.",
      },
      {
        q: "How small is too small for group benefits?",
        a: "Not as small as most owners assume. There are options for very small teams, and for some businesses individual coverage with an employer contribution works out better than a group plan. We'll tell you honestly which side of that line you fall on.",
      },
      {
        q: "What is a buy-sell agreement?",
        a: "An arrangement setting out what happens to an owner's share if they die, become disabled or leave. Funding it with insurance means the remaining owners can actually buy the departing share without draining the business — and the departing family gets fair value rather than an argument.",
      },
    ],
    legacy: ["/business-insurance", "/workman-s-compensation", "/group-benefits"],
    related: ["life-insurance", "property-casualty", "health-insurance"],
    weight: 7,
  },

  {
    slug: "property-casualty",
    name: "Home, Auto & Property",
    short: "Home & Auto",
    eyebrow: "Home, Auto & Property",
    headline: "The everyday {essentials}",
    lede: "Home, auto and umbrella coverage — reviewed as a set, because that's where the gaps and the discounts both hide.",
    image: "/images/services/property-casualty.jpg",
    imageAlt: "A two storey suburban house on a quiet street in early evening light",
    detailImage: "/images/detail/property-casualty.jpg",
    detailAlt: "A car parked on the driveway of a family home",
    intro:
      "These are the policies people buy once and never look at again, which is exactly why they drift out of line with reality. Home values change, teenagers start driving, and liability limits set a decade ago stop being adequate.",
    offerings: [
      {
        title: "Homeowner's insurance",
        body: "Dwelling coverage checked against real rebuild cost rather than market value, which are not the same number and often not close.",
      },
      {
        title: "Auto insurance",
        body: "Liability limits sized to what you actually have to lose, plus the multi-policy discounts that come from bundling properly.",
      },
      {
        title: "Umbrella liability",
        body: "Extra liability sitting above your home and auto limits. Inexpensive relative to what it covers, and frequently the biggest gap we find.",
      },
      {
        title: "Renters and condo",
        body: "Coverage for what's inside the walls, and the liability that comes with it, for anyone who doesn't own the building.",
      },
    ],
    whoFor: [
      "Your home and auto policies are with different carriers and have never been compared",
      "You've renovated, or home values in your area have moved significantly",
      "You have assets worth more than your liability limits",
      "A teenager is about to start driving",
    ],
    faqs: [
      {
        q: "Is my home insured for the right amount?",
        a: "The figure that matters is what it would cost to rebuild, not what it would sell for. Construction costs have risen sharply, and a policy set several years ago is frequently short. It's a quick thing to check and an expensive thing to get wrong.",
      },
      {
        q: "What does umbrella insurance actually do?",
        a: "It sits above your home and auto liability limits and takes over when they run out. If you're found liable for an amount beyond your auto limit, the umbrella covers the excess rather than your savings. For the cost, it's usually the most efficient coverage on the list.",
      },
      {
        q: "Will bundling save me money?",
        a: "Usually, but not always, and the discount isn't worth taking a worse policy for. We compare the bundled option against keeping them separate and show you both numbers.",
      },
    ],
    legacy: ["/home-insurance", "/auto-insurance"],
    related: ["business-insurance", "life-insurance", "travel-insurance"],
    weight: 8,
  },

  {
    slug: "travel-insurance",
    name: "Travel Insurance",
    short: "Travel",
    eyebrow: "Travel Insurance",
    headline: "Go, knowing you're {covered}",
    lede: "Trip cancellation, medical emergencies and evacuation coverage — including the international medical gap Medicare leaves wide open.",
    image: "/images/services/travel-insurance.jpg",
    imageAlt: "A young couple at a coastal overlook on holiday, one adjusting a daypack",
    detailImage: "/images/detail/travel-insurance.jpg",
    detailAlt: "A passport and boarding pass resting on a travel bag",
    intro:
      "Most travellers assume their health plan follows them abroad. Very often it doesn't, and Medicare almost never does. For retirees travelling internationally this is the single most overlooked coverage gap we see.",
    offerings: [
      {
        title: "Trip cancellation and interruption",
        body: "Recovers prepaid, non-refundable costs when illness, injury or a covered event stops the trip before or during it.",
      },
      {
        title: "Emergency medical",
        body: "Treatment abroad, where your domestic plan may provide little or nothing. Particularly important for anyone on Medicare.",
      },
      {
        title: "Medical evacuation",
        body: "Transport to adequate care or home again. The coverage nobody thinks about and the one with the largest bills attached.",
      },
      {
        title: "Baggage and delay",
        body: "The smaller protections — lost luggage, missed connections, delays — that make a bad travel day survivable.",
      },
    ],
    whoFor: [
      "You're travelling internationally and on Medicare",
      "You've prepaid a significant amount for a trip",
      "You're taking a cruise or travelling somewhere remote",
      "You're travelling with a pre-existing condition",
    ],
    faqs: [
      {
        q: "Does Medicare cover me abroad?",
        a: "In almost all cases, no. Original Medicare provides very limited coverage outside the United States, and only in narrow circumstances. Some Medicare Advantage plans and Medigap policies include limited emergency coverage abroad, but the limits are usually modest relative to what an overseas hospitalisation costs. For international travel it's worth checking specifically rather than assuming.",
      },
      {
        q: "When should I buy it?",
        a: "Soon after making your first trip payment. Several benefits — particularly pre-existing condition waivers — are only available within a short window after that initial deposit, often around two weeks.",
      },
      {
        q: "Isn't the airline's insurance enough?",
        a: "The coverage sold at checkout is typically narrow and covers the ticket rather than the trip. It rarely includes meaningful medical or evacuation benefits, which are the expensive risks.",
      },
    ],
    legacy: ["/travel-insurance"],
    related: ["medicare", "health-insurance", "property-casualty"],
    weight: 9,
  },
];

export const SERVICES_SORTED = [...SERVICES].sort((a, b) => a.weight - b.weight);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Extra product lines listed on the hub but folded into the pages above. */
export const ADDITIONAL_LINES = [
  { name: "Disability Income", href: "/services/income-strategies" },
  { name: "Group Benefits", href: "/services/business-insurance" },
  { name: "Alternative Investments", href: "/services/income-strategies" },
  { name: "Estate Planning", href: "/services/life-insurance" },
  { name: "Workers' Compensation", href: "/services/business-insurance" },
  { name: "Auto Insurance", href: "/services/property-casualty" },
  { name: "Homeowner's Insurance", href: "/services/property-casualty" },
] as const;

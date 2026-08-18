/**
 * Step-2 questions that change with the service selected.
 *
 * This is what makes one form component feel bespoke on nine different pages:
 * land on Medicare and it asks Medicare questions, land on Business and it
 * asks about headcount. Same component, same lead shape, no duplication.
 */
export type Qualifier = { id: string; label: string; options: string[] };

export const QUALIFIERS: Record<string, Qualifier[]> = {
  "retirement-planning": [
    { id: "targetAge", label: "When do you hope to retire?", options: ["Within 2 years", "3–5 years", "6–10 years", "More than 10 years", "Already retired"] },
    { id: "advisor", label: "Are you working with an advisor today?", options: ["Yes", "No", "I was, but not anymore"] },
  ],
  "income-strategies": [
    { id: "goal", label: "What matters most to you?", options: ["Income I can't outlive", "Growth potential", "Lowering my tax bill", "Not sure yet"] },
    { id: "assets", label: "Roughly what are you looking to plan around?", options: ["Under $250k", "$250k–$500k", "$500k–$1M", "Over $1M", "Prefer not to say"] },
  ],
  medicare: [
    { id: "turning65", label: "Where are you with Medicare?", options: ["Turning 65 soon", "Already enrolled", "Still working past 65", "Helping a parent"] },
    { id: "rx", label: "Do you take regular prescriptions?", options: ["Yes, several", "Yes, one or two", "No", "Not sure"] },
  ],
  "life-insurance": [
    { id: "who", label: "Who are you looking to protect?", options: ["My spouse or partner", "My children", "My business", "My estate"] },
    { id: "existing", label: "Do you have coverage now?", options: ["No coverage", "Only through work", "Yes, reviewing it", "Not sure what I have"] },
  ],
  "long-term-care": [
    { id: "stage", label: "What brought this to mind?", options: ["Planning ahead", "A parent needs care now", "Reviewing my retirement plan", "Someone recommended it"] },
    { id: "health", label: "How would you describe your health?", options: ["Excellent", "Good", "Some conditions", "Prefer not to say"] },
  ],
  "health-insurance": [
    { id: "situation", label: "What's your situation?", options: ["Self-employed", "Between jobs", "Retiring before 65", "Losing employer coverage"] },
    { id: "household", label: "Who needs coverage?", options: ["Just me", "Me and my spouse", "My whole family"] },
  ],
  "business-insurance": [
    { id: "headcount", label: "How many people do you employ?", options: ["Just me", "2–10", "11–50", "More than 50"] },
    { id: "need", label: "What are you looking for?", options: ["Group benefits", "Workers' compensation", "Key person or buy-sell", "A full coverage review"] },
  ],
  "property-casualty": [
    { id: "what", label: "What needs covering?", options: ["Home", "Auto", "Both", "Umbrella liability"] },
    { id: "why", label: "What prompted the look?", options: ["Renewal coming up", "Premium went up", "Bought something new", "Just comparing"] },
  ],
  "travel-insurance": [
    { id: "when", label: "When are you travelling?", options: ["Within a month", "1–3 months", "Later this year", "Still planning"] },
    { id: "medicare", label: "Are you on Medicare?", options: ["Yes", "No", "Not yet"] },
  ],
  other: [
    { id: "topic", label: "What can we help with?", options: ["Disability income", "Group benefits", "Alternative investments", "Something else"] },
  ],
};

/**
 * Rough lead scoring, used to flag hot leads to the office rather than to
 * rank people. Deliberately simple and easy to tune.
 */
export function scoreLead(input: { timeline?: string; interest: string; qualifiers?: Record<string, string> }): number {
  let score = 0;
  if (input.timeline === "As soon as possible") score += 40;
  else if (input.timeline === "Within 1–3 months") score += 25;
  else if (input.timeline === "3–6 months") score += 10;

  // His priority business.
  if (["retirement-planning", "income-strategies", "medicare"].includes(input.interest)) score += 20;

  const q = input.qualifiers ?? {};
  if (q.turning65 === "Turning 65 soon") score += 25;
  if (q.targetAge === "Within 2 years") score += 20;
  if (q.assets === "Over $1M" || q.assets === "$500k–$1M") score += 15;
  if (q.stage === "A parent needs care now") score += 20;
  if (q.when === "Within a month") score += 15;

  return Math.min(100, score);
}

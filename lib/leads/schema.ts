import { z } from "zod";

export const SERVICE_INTERESTS = [
  "retirement-planning",
  "income-strategies",
  "medicare",
  "life-insurance",
  "long-term-care",
  "health-insurance",
  "business-insurance",
  "property-casualty",
  "travel-insurance",
  "other",
] as const;

export const AGE_BANDS = ["Under 45", "45–54", "55–64", "65–74", "75+", "Prefer not to say"] as const;
export const TIMELINES = ["As soon as possible", "Within 1–3 months", "3–6 months", "Just researching"] as const;
export const CONTACT_TIMES = ["Morning", "Afternoon", "Evening", "Any time"] as const;

export const leadSchema = z.object({
  // Step 1
  interest: z.enum(SERVICE_INTERESTS),

  // Step 2 — qualifying. All optional; we never block on them.
  ageBand: z.enum(AGE_BANDS).optional(),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code")
    .optional()
    .or(z.literal("")),
  timeline: z.enum(TIMELINES).optional(),
  /** Free-form answers to the service-specific questions. */
  context: z.record(z.string(), z.string()).optional(),

  // Step 3 — contact
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s().+-]{10,20}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  bestTime: z.enum(CONTACT_TIMES).optional(),
  message: z.string().trim().max(2000).optional(),

  /**
   * TCPA consent. Required whenever a phone number is supplied, because that
   * is what authorises calls and texts. Enforced in the refine below.
   */
  consent: z.boolean(),

  /**
   * Honeypot. Deliberately permissive — if zod rejected a filled honeypot the
   * bot would get a 400 telling it exactly which field gave it away. It has to
   * pass validation so the route can accept it and silently drop the lead.
   */
  company: z.string().max(200).optional(),
  startedAt: z.number().optional(),

  // Provenance — which page the form was submitted from.
  source: z.string().max(200).optional(),
  /** Set by the chatbot qualifier so hot leads are visible immediately. */
  urgent: z.boolean().optional(),
  score: z.number().optional(),
});

export const leadSubmitSchema = leadSchema.refine(
  (d) => !d.phone || d.consent,
  {
    message: "Please confirm consent so we can call or text you.",
    path: ["consent"],
  },
);

export type Lead = z.infer<typeof leadSchema>;

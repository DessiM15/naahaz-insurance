import type { Metadata } from "next";
import { Playfair_Display, Mulish, Baskervville, Inter, Fraunces } from "next/font/google";
import "./concepts.css";

/**
 * Concept fonts load here rather than in the root layout, so the live site
 * never pays for typefaces only the pitch pages use.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const mulish = Mulish({ variable: "--font-mulish", subsets: ["latin"], display: "swap" });
const baskervville = Baskervville({
  variable: "--font-baskervville",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
/**
 * Fraunces at its default axis settings looks close enough to Playfair that a
 * client flipping between two concepts would read them as the same typeface.
 * Its character lives in SOFT and WONK, so both are requested here and set in
 * concepts.css. That is the whole reason it was chosen for this concept.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design concepts",
  // These are a client-facing pitch, not a public page. Keep them out of the
  // index so they never compete with the real site for the brand's own terms.
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${mulish.variable} ${baskervville.variable} ${inter.variable} ${fraunces.variable}`}
    >
      {children}
    </div>
  );
}

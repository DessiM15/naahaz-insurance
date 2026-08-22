import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Playfair_Display, Mulish } from "next/font/google";
import { ScrollManager } from "@/components/ScrollManager";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { Ava } from "@/components/chat/Ava";
import { OrganizationSchema } from "@/components/Schema";
import { site } from "@/lib/site";
import "./globals.css";
import "./brand.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

/**
 * The Broadsheet pair, chosen from the four concepts on 2026-08-22. Loaded in
 * the root layout rather than per page, because the header and footer are set
 * in them on every route.
 *
 * Geist and Instrument Serif stay for now: the pages that have not been
 * converted to the Broadsheet yet are still typeset in them.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const mulish = Mulish({ variable: "--font-mulish", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Preserved from his live site — this is his existing SEO footprint.
    default: "Insurance & Financial Services | NAAHAZ INC",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "insurance Rolling Meadows",
    "Medicare Illinois",
    "retirement planning",
    "life insurance",
    "ACA health insurance",
    "long term care insurance",
    "business insurance Illinois",
    "income strategies",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Insurance & Financial Services | NAAHAZ INC",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  // The homepage is bone now and it is the page nearly every visitor lands on,
  // so it is the one the browser chrome should match. The pages still in navy
  // are handled by colorScheme rather than by lying about the theme colour.
  themeColor: "#F7F4ED",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${playfair.variable} ${mulish.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint. The browser's own scroll restoration
            fires on refresh, which is the exact behaviour ScrollManager
            replaces, so it is turned off here during parse. This used to ride
            along inside the loader's boot script; the loader is gone and this
            is the half of it that was load bearing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{history.scrollRestoration='manual'}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-medium focus:text-navy-950"
        >
          Skip to content
        </a>

        <ScrollManager />

        {/* data-brand publishes the Broadsheet tokens to everything inside it,
            which is how the header and footer stay in the chosen palette on
            routes that have not been redesigned yet. It deliberately does not
            paint a background: see the .bs-paper note in app/brand.css. */}
        <div id="naahaz-content" data-brand="broadsheet">
          <ChromeGate>
            <SiteHeader />
          </ChromeGate>
          <main id="main">{children}</main>
          <ChromeGate>
            <SiteFooter />
          </ChromeGate>
        </div>

        <ChromeGate>
          <Ava />
        </ChromeGate>
        <OrganizationSchema />
      </body>
    </html>
  );
}

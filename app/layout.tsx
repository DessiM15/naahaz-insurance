import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Loader, LOADER_BOOT_SCRIPT } from "@/components/Loader";
import { ScrollManager } from "@/components/ScrollManager";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { Ava } from "@/components/chat/Ava";
import { OrganizationSchema } from "@/components/Schema";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

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
  themeColor: "#0A1628",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint — see components/Loader.tsx. */}
        <script dangerouslySetInnerHTML={{ __html: LOADER_BOOT_SCRIPT }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-medium focus:text-navy-950"
        >
          Skip to content
        </a>

        <ChromeGate>
          <Loader />
        </ChromeGate>
        <ScrollManager />

        <div id="naahaz-content">
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

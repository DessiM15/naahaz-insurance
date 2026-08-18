import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { SERVICES } from "./content/services";

/**
 * Legacy URL map.
 *
 * The old site had 21 English URLs, several thin or duplicated
 * (/medicarea485056e, two estate-planning pages). Consolidating to 12 pages
 * only helps if the existing rankings follow, so every retired URL gets a
 * permanent redirect to its new home.
 *
 * Built from content/services.ts so a new service can never be added without
 * its legacy paths coming along.
 */
function serviceRedirects() {
  return SERVICES.flatMap((s) =>
    s.legacy.map((from) => ({
      source: from,
      destination: `/services/${s.slug}`,
      permanent: true,
    })),
  );
}

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  async redirects() {
    return [
      ...serviceRedirects(),

      // Folded pages.
      { source: "/videos", destination: "/services#resources", permanent: true },
      { source: "/insurance-reviews", destination: "/about#testimonials", permanent: true },
      { source: "/alternative-investments", destination: "/services/income-strategies", permanent: true },
      { source: "/disability-income", destination: "/services/income-strategies", permanent: true },

      /*
       * The Russian mirror. Phase 1 is English-only but built i18n-ready, so
       * rather than 404 the 21 /ru/* URLs we send them to their English
       * equivalents. When the Russian translation lands these redirects come
       * out and /ru/* becomes a real locale again.
       *
       * TODO(phase 3): remove once next-intl routing goes live.
       */
      { source: "/ru", destination: "/", permanent: false },
      { source: "/ru/:path*", destination: "/", permanent: false },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

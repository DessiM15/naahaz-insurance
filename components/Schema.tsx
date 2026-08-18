import { site } from "@/lib/site";
import { SERVICES } from "@/content/services";
import type { Faq } from "@/content/services";

/**
 * Structured data.
 *
 * InsuranceAgency is the correct type here — it inherits from LocalBusiness,
 * which is what Google uses for local pack results. For an agency competing on
 * "insurance near me" style queries this is doing real work.
 */
export function OrganizationSchema() {
  const { address, phonePrimary } = site.contact;

  const data = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: phonePrimary,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: { "@type": "State", name: "Illinois" },
    founder: site.founders.map((f) => ({ "@type": "Person", name: f.name })),
    knowsLanguage: ["en", "ru"],
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
    })),
    // TODO(client): add NPN / state license numbers once supplied, plus
    // sameAs links for his Google Business Profile and social accounts.
  };

  return <JsonLd data={data} />;
}

export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: `${site.url}${t.href}`,
        })),
      }}
    />
  );
}

export function ArticleSchema({
  title, description, slug, published, image,
}: {
  title: string; description: string; slug: string; published: string; image: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: `${site.url}${image}`,
        datePublished: published,
        dateModified: published,
        author: { "@type": "Organization", name: site.name },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: `${site.url}/blog/${slug}`,
      }}
    />
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

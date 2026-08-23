import type { Metadata } from "next";
import { site } from "@/lib/site";
import { disclaimers } from "@/content/copy";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

/** TODO(client): placeholder — needs review by the client's attorney. */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & {Conditions}"
      lede={`The terms that govern your use of this website.`}
      needsReview
    >
      <LegalSection title="About this site">
        <p>
          This website is operated by {site.legalName}, an independent insurance
          agency located in {site.contact.address.city},{" "}
          {site.contact.address.region}. By using it you agree to these terms.
        </p>
      </LegalSection>

      <LegalSection title="Not financial or legal advice">
        <p>{disclaimers.general}</p>
        <p>{disclaimers.advice}</p>
      </LegalSection>

      <LegalSection title="Product availability">
        <p>{disclaimers.availability}</p>
      </LegalSection>

      <LegalSection title="Medicare">
        <p>{disclaimers.medicare}</p>
      </LegalSection>

      <LegalSection title="No guarantee of coverage">
        <p>
          Submitting a form or requesting an appointment through this site does
          not bind coverage, create a policy, or guarantee that coverage will be
          issued. Coverage begins only when a carrier issues a policy and the
          conditions of that policy are met.
        </p>
      </LegalSection>

      <LegalSection title="Third-party links">
        <p>
          This site may link to carriers, government resources such as
          Medicare.gov, and other third parties. We are not responsible for the
          content or practices of those sites.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms can be directed to {site.legalName} at{" "}
          {site.contact.phonePrimary}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

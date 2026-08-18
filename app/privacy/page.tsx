import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * TODO(client): placeholder. The legacy site has a privacy policy — either
 * send it over to carry across verbatim, or have counsel review this draft.
 * Insurance agencies handle sensitive health and financial data, so this page
 * genuinely needs professional review rather than a template.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede={`How ${site.name} handles the information you share with us.`}
      needsReview
    >
      <LegalSection title="What we collect">
        <p>
          When you submit a form, request an appointment or use the chat on this
          site, we collect the information you provide — typically your name,
          email address, phone number, ZIP code, and details about the coverage
          you&rsquo;re interested in. We also collect standard technical information
          such as your IP address and browser type.
        </p>
      </LegalSection>

      <LegalSection title="How we use it">
        <p>
          We use your information to respond to your enquiry, prepare quotes,
          submit applications to carriers on your behalf, and stay in touch about
          your coverage. If you provide a phone number and give consent, we may
          call or text you about insurance products and services.
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>
          We share information with insurance carriers and their underwriters
          when necessary to obtain quotes or place coverage on your behalf, and
          with service providers who help us operate this website. We do not sell
          your personal information.
        </p>
      </LegalSection>

      <LegalSection title="Health information">
        <p>
          Some products require health information. Where we collect it, we treat
          it as confidential and share it only with carriers considering your
          application, or as required by law.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can opt out of calls, texts or emails at any time by telling us, by
          replying STOP to a text message, or by using the unsubscribe link in an
          email. You may request a copy of the information we hold about you, or
          ask us to correct or delete it, by contacting us at the details below.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and analytics">
        <p>
          This site uses cookies necessary for it to function. If analytics are
          enabled, they are used only to understand how the site is used in
          aggregate.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          {site.legalName}
          <br />
          {site.contact.address.street}
          <br />
          {site.contact.address.city}, {site.contact.address.region}{" "}
          {site.contact.address.postalCode}
          <br />
          {site.contact.phonePrimary}
        </p>
      </LegalSection>
    </LegalPage>
  );
}

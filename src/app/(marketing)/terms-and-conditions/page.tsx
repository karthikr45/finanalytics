import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { brand } from "@/lib/site-content";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 September 2026"
      sections={[
        {
          heading: "1. Acceptance of terms",
          body: [
            `By accessing or using this website or engaging ${brand.legalName} ("we", "us", "our") for any service, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this site or our services.`,
          ],
        },
        {
          heading: "2. Scope of services",
          body: [
            "We provide income tax, GST, company and partnership compliance, bookkeeping, licensing, and IT services as described on this site. The exact scope, deliverables and timelines for any engagement are confirmed separately in writing (email or an engagement letter) before work begins.",
          ],
        },
        {
          heading: "3. Client responsibilities",
          body: [
            "Timely and accurate filings depend on documents and information you provide. You are responsible for the accuracy of information supplied to us, and for providing it within the timelines we communicate ahead of statutory deadlines.",
          ],
        },
        {
          heading: "4. Fees & payment",
          body: [
            "Fees are quoted per engagement and are payable as agreed at the time of engagement. Late payment may result in a pause in ongoing services until dues are cleared.",
          ],
        },
        {
          heading: "5. Limitation of liability",
          body: [
            "While we exercise professional care in every engagement, we are not liable for penalties, interest or other consequences arising from inaccurate or delayed information provided by the client, or from statutory changes outside our control.",
          ],
        },
        {
          heading: "6. Governing law",
          body: [
            "These terms are governed by the laws of India, with courts in Hyderabad, Telangana having exclusive jurisdiction.",
          ],
        },
        {
          heading: "7. Contact",
          body: [`Questions about these terms can be sent to ${brand.email} or our toll-free line, ${brand.phone}.`],
        },
      ]}
    />
  );
}

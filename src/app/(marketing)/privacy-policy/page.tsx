import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { brand } from "@/lib/site-content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 September 2026"
      sections={[
        {
          heading: "1. Information we collect",
          body: [
            "We collect information you provide directly — through our contact and lead-capture forms (name, phone, email, service interest), and, if you register for our client portal, your name, email, phone, company and any documents you upload for your engagement.",
          ],
        },
        {
          heading: "2. How we use it",
          body: [
            "Information is used to respond to enquiries, deliver the services you've engaged us for, meet our own regulatory record-keeping obligations, and — with your consent — to contact you about services that may be relevant to your business.",
          ],
        },
        {
          heading: "3. Data storage & security",
          body: [
            "Client data and documents are stored on access-controlled systems. Portal accounts are protected by authentication, and access to client records is limited to staff working on that engagement.",
          ],
        },
        {
          heading: "4. Sharing of information",
          body: [
            "We do not sell client information. Data is shared only where required to deliver a service (e.g. filings with statutory authorities on your behalf) or where required by law.",
          ],
        },
        {
          heading: "5. Your rights",
          body: [
            "You may request access to, correction of, or deletion of your personal data by contacting us, subject to any statutory retention obligations that apply to compliance records.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "This site may use essential cookies and, in the client portal, session cookies necessary for you to stay signed in. We do not use third-party advertising trackers.",
          ],
        },
        {
          heading: "7. Contact",
          body: [`For privacy-related questions, contact us at ${brand.email} or ${brand.phone}.`],
        },
      ]}
    />
  );
}

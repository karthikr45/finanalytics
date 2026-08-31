import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { brand } from "@/lib/site-content";

export const metadata: Metadata = { title: "Refund & Shipping Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund, Return & Shipping Policy"
      updated="1 September 2026"
      sections={[
        {
          heading: "1. Nature of services",
          body: [
            `${brand.legalName} provides professional advisory and filing services — income tax, GST, company compliance, bookkeeping, licensing and digital services. As these are services rather than physical goods, no shipping is involved and this policy addresses refunds and cancellations only.`,
          ],
        },
        {
          heading: "2. Cancellation before work begins",
          body: [
            "If you cancel an engagement before any filing, registration or development work has started, fees paid (minus any payment gateway charges already incurred) are refunded within 7–10 business days.",
          ],
        },
        {
          heading: "3. Once work has commenced",
          body: [
            "Once a filing has been submitted, a registration application lodged, or development work has started, fees for the work completed are non-refundable. Where a package covers multiple deliverables, refunds are prorated against work not yet started.",
          ],
        },
        {
          heading: "4. Statutory fees & third-party charges",
          body: [
            "Government fees, statutory charges, and third-party costs (domain registration, payment gateway fees and similar) paid on your behalf are non-refundable once incurred, regardless of the status of the underlying engagement.",
          ],
        },
        {
          heading: "5. How to request a refund",
          body: [`Email ${brand.email} or call ${brand.phone} with your invoice or reference number. We aim to respond within 2 business days.`],
        },
      ]}
    />
  );
}

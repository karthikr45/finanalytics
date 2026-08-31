import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ProcessSteps from "@/components/process-steps";
import FAQAccordion from "@/components/faq-accordion";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { gstConsultantsContent, processStrip } from "@/lib/site-content";
import { getService } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "GST Consultants in Hyderabad",
  description:
    "GST registration, monthly & quarterly return filing, reconciliation and departmental representation for businesses across Hyderabad.",
};

const faqs = [
  {
    question: "How quickly can I get GST registered?",
    answer: "Typically within a few working days of submitting complete documentation, subject to department processing.",
  },
  {
    question: "Do you file GSTR-1 and GSTR-3B every month?",
    answer: "Yes — both are tracked and filed against your compliance calendar, along with annual returns where applicable.",
  },
  {
    question: "What if I get a GST notice?",
    answer: "We review the notice, reconcile the underlying data, and represent you before the GST department directly.",
  },
];

export default function GstConsultantsPage() {
  const gstService = getService("gst-compliances");

  return (
    <>
      <section className="mesh-dark grain relative isolate overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            GST Registration &amp; Compliance
          </p>
          <h1 className="font-display text-balance mt-5 text-4xl leading-[1.1] text-white sm:text-5xl">
            {gstConsultantsContent.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {gstConsultantsContent.intro}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk to a GST consultant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {gstService && (
              <Button asChild size="lg" variant="outlineDark">
                <Link href={`/services/${gstService.slug}`}>View GST compliance details</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Why businesses choose us
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                GST compliance, without the chase
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gstConsultantsContent.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-ink/8 bg-white p-7">
                  <CheckCircle2 className="h-5 w-5 text-emerald" strokeWidth={1.75} />
                  <h3 className="font-display mt-4 text-base text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                How it works
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                From registration to your first return
              </h2>
            </div>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={processStrip} />
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
          </Reveal>
          <div className="mt-6">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner
            title="Get your GST registration & filings on track"
            primaryHref="/contact"
            primaryLabel="Talk to a GST consultant"
          />
        </div>
      </section>
    </>
  );
}

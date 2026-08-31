import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import ServicesExplorer from "@/components/services-explorer";
import ProcessSteps from "@/components/process-steps";
import StatsStrip from "@/components/stats-strip";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { categories } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Income tax, GST, company compliance, bookkeeping, licenses and digital services for startups and growing businesses in Hyderabad.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mesh-dark grain relative isolate overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              10+ years of trusted advisory
            </span>
            <h1 className="font-display text-balance mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Everything your business needs to stay compliant &amp; grow
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Taxes, registrations, bookkeeping, licenses and digital
              presence &mdash; ten service lines, one dedicated team, zero
              missed deadlines.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="glass-dark rounded-2xl px-4 py-5 text-center"
              >
                <p className="text-sm font-semibold text-white">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-12 pb-24 sm:-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-ink/8 bg-paper p-6 shadow-[0_20px_60px_-30px_rgba(10,15,30,0.25)] sm:p-10">
            <ServicesExplorer />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                How it works
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                From first call to ongoing compliance
              </h2>
            </div>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StatsStrip />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import ServicesExplorer from "@/components/services-explorer";
import ProcessSteps from "@/components/process-steps";
import PricingTierCard from "@/components/pricing-tier-card";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { categoryOrder } from "@/lib/services-content";
import { processStrip, pricingTiers } from "@/lib/site-content";

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
          <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              10+ years of trusted advisory
            </span>
            <h1 className="font-display text-balance mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Financial &amp; Tax Compliance, plus Digital Services
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Twelve service lines across tax, company law and digital
              presence &mdash; one dedicated team, zero missed deadlines.
            </p>
          </div>

          <div className="relative min-w-0 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 lg:aspect-[3/2]">
              <Image
                src="/images/finalytics/secondary/services-catalogue-hero.webp"
                alt="Organized financial, legal and digital services workspace"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[72%_center] lg:object-[75%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
            </div>
          </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {categoryOrder.map((cat) => (
              <div key={cat} className="glass-dark rounded-2xl px-4 py-5 text-center">
                <p className="text-sm font-semibold text-white">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-12 pb-24 sm:-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-ink/8 bg-paper p-6 shadow-[0_20px_60px_-30px_rgba(11,18,32,0.25)] sm:p-10">
            <ServicesExplorer />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                How it works
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                From first call to ongoing compliance
              </h2>
            </div>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={processStrip} />
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Packages
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Transparent packages, custom quotes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Every business&rsquo;s filing load is different, so every
                quote is too &mdash; these packages show what&rsquo;s
                typically bundled at each stage of growth.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <PricingTierCard tier={tier} />
              </Reveal>
            ))}
          </div>
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

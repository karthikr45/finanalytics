import type { Metadata } from "next";
import { ShieldCheck, Gauge, HeartHandshake } from "lucide-react";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { aboutContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Startup India Registration Consultants — Akshara Finalytics is a Hyderabad-based, tailor-made accounting and business consultancy firm.",
};

const advantageIcons = [ShieldCheck, Gauge, HeartHandshake];

export default function AboutPage() {
  return (
    <>
      <section className="mesh-dark grain relative isolate overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            About Akshara Finalytics
          </p>
          <h1 className="font-display text-balance mt-5 text-4xl leading-[1.1] text-white sm:text-5xl">
            {aboutContent.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {aboutContent.intro}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
              {aboutContent.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Comprehensive compliance
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Everything a growing company needs to stay compliant
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.comprehensiveServices.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-ink/8 bg-white p-7">
                  <span className="font-display text-2xl text-emerald/25">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-base text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-ink/8 bg-paper-dim p-8 sm:p-14">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                  Why partner with us
                </p>
                <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">The advantages</h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {aboutContent.advantages.map((adv, i) => {
                const Icon = advantageIcons[i];
                return (
                  <Reveal key={adv.title} delay={i * 0.08}>
                    <div className="h-full rounded-3xl bg-white p-7 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display mt-4 text-base text-ink">{adv.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{adv.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                What we stand for
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">Our core values</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {aboutContent.coreValues.map((value, i) => (
              <Reveal key={value} delay={i * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white px-5 py-4">
                  <span className="font-display text-sm text-emerald">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-ink/80">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner
            eyebrow="Our motto"
            title={aboutContent.motto}
            description="Reach out and we'll walk you through exactly how we can help — no obligation, no pressure."
            primaryHref="/contact"
            primaryLabel="Get in touch"
          />
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, Clock, Users, Sparkles } from "lucide-react";
import ServiceCard from "@/components/service-card";
import ProcessSteps from "@/components/process-steps";
import StatsStrip from "@/components/stats-strip";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { services, contact } from "@/lib/services-data";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Compliance-first",
    description:
      "Every filing is tracked against statutory deadlines, so nothing is ever left to the last minute.",
  },
  {
    icon: Clock,
    title: "10+ years, one team",
    description:
      "A decade of handling tax and corporate compliance for founders and growing businesses.",
  },
  {
    icon: Users,
    title: "Dedicated point of contact",
    description:
      "You get a named advisor who knows your business, not a rotating support queue.",
  },
];

const featured = services.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mesh-dark grain relative isolate overflow-hidden pb-28 pt-24 sm:pb-36 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                Hyderabad &middot; Startup India registered consultants
              </span>
              <h1 className="font-display text-balance mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
                Tax, compliance &amp; business advisory, without the
                back-and-forth
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Akshara Finalytics handles income tax, GST, company
                registration, bookkeeping, licensing and your digital
                presence &mdash; so founders can spend their time building,
                not filing.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="group flex items-center justify-center gap-2 rounded-full bg-gold-light px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(228,199,128,0.55)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={`tel:${contact.phone.replace(/-/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <PhoneCall className="h-4 w-4 text-gold-light" />
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-dark rounded-3xl p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  What we handle this week
                </p>
                <ul className="mt-5 space-y-4">
                  {["GST return filings", "ROC annual compliance", "New company incorporation", "Payroll & bookkeeping"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/80 last:border-0 last:pb-0"
                      >
                        {item}
                        <span className="rounded-full bg-emerald/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald">
                          On track
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 -mt-14 pb-4 sm:-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-ink/8 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(10,15,30,0.3)]">
                  <h.icon className="h-6 w-6 text-gold" strokeWidth={1.75} />
                  <h3 className="font-display mt-4 text-lg text-ink">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Services
                </p>
                <h2 className="font-display mt-4 max-w-lg text-3xl text-ink sm:text-4xl">
                  Ten service lines, handled under one roof
                </h2>
              </div>
              <Link
                href="/services"
                className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-ink"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 py-24 sm:py-28">
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

      {/* Stats */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StatsStrip />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner />
        </div>
      </section>
    </>
  );
}

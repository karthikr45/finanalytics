import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PhoneCall, Download, MapPin, Sparkles } from "lucide-react";
import ServiceCard from "@/components/service-card";
import ProcessSteps from "@/components/process-steps";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import TrustBadgeRow from "@/components/trust-badge-row";
import TestimonialCarousel from "@/components/testimonial-carousel";
import LeadCaptureForm from "@/components/lead-capture-form";
import StatCounter from "@/components/stat-counter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { servicesBySlug } from "@/lib/services-content";
import {
  coreOfferings,
  processStrip,
  trustStat,
  aboutContent,
  branches,
  brand,
} from "@/lib/site-content";

const financialFeatured = ["gst-compliances", "company-compliances", "book-keeping"].map(
  (s) => servicesBySlug.get(s)!,
);
const digitalFeatured = [
  "website-development",
  "ecommerce-development",
  "mobile-applications-development",
].map((s) => servicesBySlug.get(s)!);

const financialImages: Record<string, { src: string; alt: string }> = {
  "gst-compliances": {
    src: "/images/finalytics/gst-compliance.webp",
    alt: "GST compliance documents and reporting workspace",
  },
  "company-compliances": {
    src: "/images/finalytics/company-compliance.webp",
    alt: "Business professionals reviewing company compliance documents",
  },
  "book-keeping": {
    src: "/images/finalytics/bookkeeping.webp",
    alt: "Professional reconciling a bookkeeping ledger",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mesh-dark grain relative isolate overflow-hidden pb-28 pt-24 sm:pb-36 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                Hyderabad &middot; Trusted by 5,000+ clients
              </span>
              <h1 className="font-display text-balance mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
                GST &amp; Income Tax services built around your business
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Akshara Finalytics brings deep GST registration and compliance
                expertise together with income tax, company compliance,
                bookkeeping and licensing — so founders spend their time
                building, not filing.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/about">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outlineDark">
                  <a href="/brochure.pdf" download>
                    <Download className="h-4 w-4 text-gold-light" />
                    Download Brochure
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative min-w-0 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[3/2] lg:aspect-[3/2]">
                <Image
                  src="/images/finalytics/hero-advisor-consultation.webp"
                  alt="Akshara Finalytics advisor consulting with a business owner"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[70%_center] lg:object-[68%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
              </div>
              <div className="glass-dark relative -mt-10 mx-4 rounded-2xl p-5 sm:mx-8 sm:p-6 lg:absolute lg:inset-x-5 lg:bottom-5 lg:mt-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  What we handle this week
                </p>
                <ul className="mt-5 space-y-4">
                  {["GST return filings", "ROC annual compliance", "New company incorporation", "Payroll & bookkeeping"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between gap-4 border-b border-white/15 pb-4 text-sm text-white/90 last:border-0 last:pb-0"
                      >
                        {item}
                        <span className="shrink-0 rounded-full bg-emerald-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-emerald shadow-sm">
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

      {/* Trust badges */}
      <section className="relative z-10 -mt-14 pb-4 sm:-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustBadgeRow />
        </div>
      </section>

      {/* Core offerings */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                What we do
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Three disciplines, one team
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
              {coreOfferings.map((offering, i) => (
                <Reveal key={offering.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-ink/8 bg-white p-7 sm:p-8">
                  <span className="font-display text-3xl text-emerald/25">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-lg text-ink">{offering.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {offering.description}
                  </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-3xl border border-ink/8">
                <Image
                  src="/images/finalytics/financial-review-advisor.webp"
                  alt="Financial professional reviewing business reports"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ProcessSteps steps={processStrip} />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner
            title="Partner with Akshara Finalytics and embark on your entrepreneurial journey"
            description="From your first registration to ongoing compliance, we handle the paperwork so you can focus on building the business."
            primaryHref="/contact"
            primaryLabel="Contact Now"
          />
        </div>
      </section>

      {/* Services we're offering */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                  Services we&rsquo;re offering
                </p>
                <h2 className="font-display mt-4 max-w-lg text-3xl text-ink sm:text-4xl">
                  GST, company registration &amp; bookkeeping
                </h2>
              </div>
              <Link href="/services" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
                View all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {financialFeatured.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <ServiceCard service={service} image={financialImages[service.slug]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                  IT services
                </p>
                <h2 className="font-display mt-4 max-w-lg text-3xl text-ink sm:text-4xl">
                  A digital presence, from the same team
                </h2>
              </div>
              <Link href="/services/it-services" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
                Explore digital services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-ink/8 sm:aspect-[2/1]">
              <Image
                src="/images/finalytics/digital-services-devices.webp"
                alt="Website, ecommerce and mobile application interfaces across devices"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {digitalFeatured.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we are — Vision / Mission / Motto */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                What we are
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Vision, mission &amp; motto
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Tabs defaultValue="vision" className="mt-10 flex flex-col items-center">
              <TabsList>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="motto">Our Motto</TabsTrigger>
              </TabsList>
              <TabsContent value="vision" className="w-full">
                <div className="rounded-3xl border border-ink/8 bg-white p-8 text-center sm:p-12">
                  <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                    {aboutContent.vision}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="mission" className="w-full">
                <div className="rounded-3xl border border-ink/8 bg-white p-8 text-center sm:p-12">
                  <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                    {aboutContent.mission}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="motto" className="w-full">
                <div className="rounded-3xl border border-ink/8 bg-white p-8 text-center sm:p-12">
                  <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                    {aboutContent.motto}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* Trust stat */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mesh-dark grain relative overflow-hidden rounded-[2.5rem] px-8 py-16 sm:px-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Why choose us
                </p>
                <h2 className="font-display text-balance mt-4 text-3xl text-white sm:text-4xl">
                  {trustStat.headline}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/60">
                  {trustStat.blurb}
                </p>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {trustStat.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/80"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6 lg:col-span-7 lg:grid-cols-4">
                <StatCounter tone="dark" value={5000} suffix="+" label="Clients trusted" />
                <StatCounter tone="dark" value={10} suffix="+" label="Years of experience" />
                <StatCounter tone="dark" value={2} label="Hyderabad branches" />
                <StatCounter tone="dark" value={24} suffix="/7" label="Support availability" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get a call back */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Get started
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Get a call back
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Tell us what you need and a compliance advisor will call you
                back — usually the same business day.
              </p>
              <a
                href={`tel:${brand.phone.replace(/-/g, "")}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:text-emerald-light"
              >
                <PhoneCall className="h-4 w-4" />
                Or call {brand.phone}
              </a>
            </div>
            <Reveal className="lg:col-span-7">
              <div className="rounded-3xl border border-ink/8 bg-white p-7 sm:p-9">
                <LeadCaptureForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Client voices
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                What clients tell us
              </h2>
            </div>
          </Reveal>
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* We are from Hyderabad */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] border border-ink/8 bg-white">
              <div className="relative aspect-[2/1] min-h-56 lg:hidden">
                <Image
                  src="/images/finalytics/hyderabad-skyline.webp"
                  alt="Hyderabad HITEC City skyline at blue hour"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative p-8 sm:p-14 lg:min-h-[440px]">
                <Image
                  src="/images/finalytics/hyderabad-skyline.webp"
                  alt="Hyderabad HITEC City skyline at blue hour"
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="hidden object-cover lg:block"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/90 to-ink/45 lg:block" />
              <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                    We&rsquo;re from Hyderabad
                  </p>
                  <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl lg:text-white">
                    Local, and easy to reach
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted lg:text-white/70">
                    Two branches across Hyderabad mean an advisor is never far
                    away — whether you&rsquo;d rather meet in person in
                    Himayatnagar or at our HITEC City office in Madhapur.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
                  {branches.map((branch) => (
                    <div key={branch.id} className="rounded-2xl bg-paper-dim p-5 lg:border lg:border-white/15 lg:bg-ink/70 lg:backdrop-blur-md">
                      <MapPin className="h-4 w-4 text-emerald" />
                      <p className="font-display mt-3 text-sm text-ink lg:text-white">{branch.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted lg:text-white/70">
                        {branch.lines.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

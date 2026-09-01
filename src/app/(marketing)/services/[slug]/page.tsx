import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService, getRelatedServices } from "@/lib/services-content";
import { getServiceHero } from "@/lib/service-images";
import ServiceCard from "@/components/service-card";
import FAQAccordion from "@/components/faq-accordion";
import CTABanner from "@/components/cta-banner";
import Reveal from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = getRelatedServices(service);
  const hero = getServiceHero(service);

  return (
    <>
      <section className="mesh-dark grain relative isolate overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
            <Link href="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white/70">{service.title}</span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
          <div className="flex items-start gap-5">
            <div className="glass-dark flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-gold-light">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <Badge variant="gold">{service.category}</Badge>
              <h1 className="font-display text-balance mt-3 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 text-base text-gold-light sm:text-lg">{service.tagline}</p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {service.body}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineDark">
              <Link href="/payments">Pay for this service</Link>
            </Button>
          </div>
          </div>
          {hero && (
            <div className="relative min-w-0 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 lg:aspect-[16/10]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: hero.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-transparent" />
              </div>
            </div>
          )}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pb-20 sm:-mt-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2rem] border border-ink/8 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,18,32,0.2)] sm:p-10">
              <h2 className="font-display text-2xl text-ink">What&rsquo;s included</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-soft text-emerald">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
          </Reveal>
          <div className="mt-6">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl text-ink">Related services</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CTABanner
            title={`Ready to get ${service.title.toLowerCase()} handled?`}
            primaryHref="/contact"
            primaryLabel="Talk to an advisor"
          />
        </div>
      </section>
    </>
  );
}

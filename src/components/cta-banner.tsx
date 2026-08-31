import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import { brand } from "@/lib/site-content";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";

export default function CTABanner({
  eyebrow = "Let's talk",
  title = "Compliance handled, so you can focus on the business",
  description = "Book a free consultation and we'll map out exactly what your business needs — taxes, registrations, licenses and books, all under one roof.",
  primaryHref = "/services",
  primaryLabel = "Explore all services",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <Reveal>
      <div className="mesh-dark grain relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
          {eyebrow}
        </p>
        <h2 className="font-display text-balance mx-auto mt-4 max-w-2xl text-3xl text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/60">
          {description}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outlineDark" size="lg">
            <a href={`tel:${brand.phone.replace(/-/g, "")}`}>
              <PhoneCall className="h-4 w-4 text-gold-light" />
              {brand.phone}
            </a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

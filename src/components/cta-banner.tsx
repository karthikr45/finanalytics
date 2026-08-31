import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import { contact } from "@/lib/services-data";
import Reveal from "@/components/reveal";

export default function CTABanner() {
  return (
    <Reveal>
      <div className="mesh-dark grain relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
          Let&rsquo;s talk
        </p>
        <h2 className="font-display text-balance mx-auto mt-4 max-w-2xl text-3xl text-white sm:text-4xl lg:text-5xl">
          Compliance handled, so you can focus on the business
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/60">
          Book a free consultation and we&rsquo;ll map out exactly what your
          business needs &mdash; taxes, registrations, licenses and books,
          all under one roof.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/services"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gold-light px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_30px_-8px_rgba(228,199,128,0.5)] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
          >
            Explore all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`tel:${contact.phone.replace(/-/g, "")}`}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
          >
            <PhoneCall className="h-4 w-4 text-gold-light" />
            {contact.phone}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

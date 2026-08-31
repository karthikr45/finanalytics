import type { Metadata } from "next";
import Image from "next/image";
import { PhoneCall, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";
import BranchLocationCard from "@/components/branch-location-card";
import Reveal from "@/components/reveal";
import { brand, branches } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Akshara Finalytics — call our toll-free line, email us, or visit our Himayatnagar or Madhapur branches in Hyderabad.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mesh-dark grain relative isolate overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            Get in touch
          </p>
          <h1 className="font-display text-balance mt-5 text-4xl leading-[1.1] text-white sm:text-5xl">
            Let&rsquo;s talk about what your business needs
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Call our toll-free line, send a message, or visit either branch —
            we usually respond the same business day.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-14 pb-24 sm:-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative mb-8 aspect-video overflow-hidden rounded-3xl border border-white/10 sm:aspect-[2/1] lg:aspect-[3/1]">
              <Image
                src="/images/finalytics/secondary/contact-office.webp"
                alt="Welcoming professional office reception"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-white sm:p-10">
                <div>
                  <h2 className="font-display text-2xl">Reach us directly</h2>
                  <div className="mt-8 space-y-6">
                    <a href={`tel:${brand.phone.replace(/-/g, "")}`} className="flex items-start gap-3">
                      <PhoneCall className="mt-0.5 h-5 w-5 text-gold-light" />
                      <div>
                        <p className="text-sm font-semibold">Toll-free</p>
                        <p className="text-sm text-white/65">{brand.phone}</p>
                      </div>
                    </a>
                    <a href={`mailto:${brand.email}`} className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-gold-light" />
                      <div>
                        <p className="text-sm font-semibold">Email</p>
                        <p className="text-sm text-white/65">{brand.email}</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-gold-light" />
                      <div>
                        <p className="text-sm font-semibold">Support</p>
                        <p className="text-sm text-white/65">24/7 customer support</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-10 text-xs text-white/40">
                  {brand.legalName} &middot; Hyderabad, Telangana
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="h-full rounded-3xl border border-ink/8 bg-white p-8 sm:p-10">
                <h2 className="font-display text-2xl text-ink">Send a message</h2>
                <p className="mt-2 text-sm text-muted">
                  Fill this in and a compliance advisor will call you back.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                Visit us
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
                Two branches across Hyderabad
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {branches.map((branch, i) => (
              <Reveal key={branch.id} delay={i * 0.1}>
                <BranchLocationCard branch={branch} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

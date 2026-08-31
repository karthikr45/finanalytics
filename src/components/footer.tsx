import Link from "next/link";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import { contact, services } from "@/lib/services-data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold text-sm font-bold text-ink">
                AF
              </span>
              <span className="font-display text-lg tracking-tight text-white">
                Akshara <span className="text-gold-light">Finalytics</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              End-to-end tax, compliance, accounting and business advisory
              for startups and growing businesses — trusted for 10+ years.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a
                href={`tel:${contact.phone.replace(/-/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <PhoneCall className="h-4 w-4 shrink-0 text-gold-light" />
                {contact.phone}
              </a>
              <a
                href="mailto:hello@aksharafinalytics.com"
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-light" />
                hello@aksharafinalytics.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <address className="not-italic leading-relaxed">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Navigate
              </h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Compliance
              </h3>
              <ul className="mt-5 space-y-3">
                {services.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services#${s.slug}`}
                      className="text-sm text-white/65 transition-colors hover:text-gold-light"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Growth
              </h3>
              <ul className="mt-5 space-y-3">
                {services.slice(5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services#${s.slug}`}
                      className="text-sm text-white/65 transition-colors hover:text-gold-light"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Akshara Finalytics Private
            Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Hyderabad, Telangana &middot; Startup India registered consultants
          </p>
        </div>
      </div>
    </footer>
  );
}

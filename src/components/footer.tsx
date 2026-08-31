import Link from "next/link";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/icons/social-icons";
import { brand, branches } from "@/lib/site-content";
import { servicesByCategory } from "@/lib/services-content";
import { LogoLockup } from "@/components/logo";

const usefulLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/payments", label: "Pay Now" },
  { href: "/portal/login", label: "Akshara Connect" },
];

const legalLinks = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-return-shipping-policy", label: "Refund & Shipping Policy" },
];

export default function Footer() {
  const taxServices = servicesByCategory["Tax & Compliance"];
  const legalServices = servicesByCategory["Company & Legal"];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/">
              <LogoLockup tone="dark" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Tailor-made accounting and business consultancy, trusted by more
              than 5,000 clients across income tax, GST, company compliance,
              bookkeeping, licensing and digital services.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: brand.social.facebook, Icon: FacebookIcon },
                { href: brand.social.twitter, Icon: XIcon },
                { href: brand.social.instagram, Icon: InstagramIcon },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold-light hover:text-gold-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a
                href={`tel:${brand.phone.replace(/-/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <PhoneCall className="h-4 w-4 shrink-0 text-gold-light" />
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-light" />
                {brand.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Useful Links
              </h3>
              <ul className="mt-5 space-y-3">
                {usefulLinks.map((link) => (
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
              <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-white/40">
                Legal
              </h3>
              <ul className="mt-5 space-y-3">
                {legalLinks.map((link) => (
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
                Tax &amp; Compliance
              </h3>
              <ul className="mt-5 space-y-3">
                {taxServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
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
                Company &amp; Legal
              </h3>
              <ul className="mt-5 space-y-3">
                {legalServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-white/65 transition-colors hover:text-gold-light"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 grid grid-cols-1 gap-6 sm:col-span-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
              {branches.map((branch) => (
                <div key={branch.id}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    {branch.name}
                  </h3>
                  <div className="mt-3 flex items-start gap-2.5 text-sm text-white/65">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                    <address className="not-italic leading-relaxed">
                      {branch.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {brand.legalName}. All rights
            reserved.
          </p>
          <p className="text-xs text-white/40">
            Hyderabad, Telangana &middot; Two branches, one compliance team
          </p>
        </div>
      </div>
    </footer>
  );
}

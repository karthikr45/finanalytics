"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PhoneCall, ChevronDown, LogIn, FileText } from "lucide-react";
import { brand } from "@/lib/site-content";
import { categoryOrder, servicesByCategory } from "@/lib/services-content";
import { Button } from "@/components/ui/button";

const topLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open || megaOpen
          ? "bg-ink/95 backdrop-blur-xl border-b border-line-dark"
          : "bg-transparent"
      }`}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold text-sm font-bold text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
            AF
          </span>
          <span className="font-display text-lg tracking-tight text-white">
            Akshara <span className="text-gold-light">Finalytics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>
          <button
            type="button"
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((v) => !v)}
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
          >
            Services
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
          </button>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/portal/invoices"
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FileText className="h-4 w-4 text-gold-light" />
            Invoice Login
          </Link>
          <Link
            href="/portal/login"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <LogIn className="h-4 w-4 text-gold-light" />
            Akshara Connect
          </Link>
          <Button asChild size="sm" variant="gold">
            <Link href="/payments">Pay Now</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega-menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="hidden border-t border-line-dark bg-ink/98 backdrop-blur-xl lg:block"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-8 py-8">
              {categoryOrder.map((cat) => (
                <div key={cat}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                    {cat}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {servicesByCategory[cat].map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-white"
                        >
                          <s.icon className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-line-dark px-8 py-4">
              <Link
                href="/services"
                className="text-sm font-semibold text-gold-light hover:text-white"
              >
                View all services &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line-dark lg:hidden"
          >
            <nav className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto px-6 py-6">
              {topLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                Services
              </p>
              {categoryOrder.map((cat) => (
                <div key={cat} className="mt-2">
                  <p className="px-3 text-xs font-medium text-gold-light">{cat}</p>
                  <div className="mt-1 flex flex-col">
                    {servicesByCategory[cat].map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="rounded-xl px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t border-line-dark pt-5">
                <Link
                  href="/portal/invoices"
                  className="flex items-center gap-2 px-3 text-sm font-medium text-white/75"
                >
                  <FileText className="h-4 w-4 text-gold-light" />
                  Invoice Login
                </Link>
                <Link
                  href="/portal/login"
                  className="flex items-center gap-2 px-3 text-sm font-medium text-white/75"
                >
                  <LogIn className="h-4 w-4 text-gold-light" />
                  Akshara Connect
                </Link>
                <a
                  href={`tel:${brand.phone.replace(/-/g, "")}`}
                  className="flex items-center gap-2 px-3 text-sm font-medium text-white/75"
                >
                  <PhoneCall className="h-4 w-4 text-gold-light" />
                  {brand.phone}
                </a>
                <Link
                  href="/payments"
                  className="mx-3 rounded-full bg-gold-light px-5 py-3 text-center text-sm font-semibold text-ink"
                >
                  Pay Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { contact } from "@/lib/services-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile drawer on navigation. Adjusting state during render
  // (rather than in an effect) avoids an extra commit-then-correct render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
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
        scrolled || open
          ? "bg-ink/90 backdrop-blur-xl border-b border-line-dark"
          : "bg-transparent"
      }`}
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

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${contact.phone.replace(/-/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <PhoneCall className="h-4 w-4 text-gold-light" strokeWidth={2} />
            {contact.phone}
          </a>
          <Link
            href="/#contact"
            className="rounded-full bg-gold-light px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(228,199,128,0.6)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Book a Consultation
          </Link>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line-dark lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-3 border-t border-line-dark pt-5">
                <a
                  href={`tel:${contact.phone.replace(/-/g, "")}`}
                  className="flex items-center gap-2 px-3 text-sm font-medium text-white/75"
                >
                  <PhoneCall className="h-4 w-4 text-gold-light" strokeWidth={2} />
                  {contact.phone}
                </a>
                <Link
                  href="/#contact"
                  className="mx-3 rounded-full bg-gold-light px-5 py-3 text-center text-sm font-semibold text-ink"
                >
                  Book a Consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

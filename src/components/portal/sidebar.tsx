"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Receipt,
  CreditCard,
  LifeBuoy,
  Inbox,
  Settings,
  X,
} from "lucide-react";
import type { Role } from "@prisma/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/filings", label: "Filings", icon: FileText, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/documents", label: "Documents", icon: FolderOpen, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/invoices", label: "Invoices", icon: Receipt, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/payments", label: "Payments", icon: CreditCard, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/tickets", label: "Tickets", icon: LifeBuoy, roles: ["CLIENT", "STAFF", "ADMIN"] },
  { href: "/portal/clients", label: "Clients", icon: Users, roles: ["STAFF", "ADMIN"] },
  { href: "/portal/leads", label: "Leads", icon: Inbox, roles: ["STAFF", "ADMIN"] },
  { href: "/portal/settings", label: "Settings", icon: Settings, roles: ["CLIENT", "STAFF", "ADMIN"] },
] as const;

export default function PortalSidebar({
  role,
  mobileOpen,
  onClose,
}: {
  role: Role;
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const items = navItems.filter((item) => (item.roles as readonly string[]).includes(role));

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold text-xs font-bold text-ink">
            AF
          </span>
          <span className="font-display text-base text-white">Akshara Connect</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/60 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.85} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-5">
        <p className="text-[0.65rem] text-white/30">
          Signed in as <span className="font-medium text-white/50">{role.toLowerCase()}</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 bg-ink lg:block">{content}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-ink shadow-2xl">{content}</aside>
        </div>
      )}
    </>
  );
}

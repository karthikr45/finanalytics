"use client";

import { useState } from "react";
import type { Role } from "@prisma/client";
import PortalSidebar from "@/components/portal/sidebar";
import PortalTopbar from "@/components/portal/topbar";

export default function PortalShell({
  role,
  name,
  email,
  children,
}: {
  role: Role;
  name: string;
  email: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper-dim">
      <PortalSidebar role={role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar name={name} email={email} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PortalShell from "@/components/portal/portal-shell";

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/portal/login");

  return (
    <PortalShell role={session.user.role} name={session.user.name} email={session.user.email}>
      {children}
    </PortalShell>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const session = await auth();
  if (session!.user.role === "CLIENT") redirect("/portal/dashboard");

  const { branch } = await searchParams;

  const clients = await prisma.user.findMany({
    where: {
      role: "CLIENT",
      ...(branch ? { branch: branch as "HIMAYATNAGAR" | "MADHAPUR" } : {}),
    },
    include: {
      _count: { select: { filings: true, invoices: true, tickets: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl text-ink">Clients</h1>
          <p className="mt-1 text-sm text-muted">{clients.length} client{clients.length === 1 ? "" : "s"} on file.</p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "All", value: undefined },
            { label: "Himayatnagar", value: "HIMAYATNAGAR" },
            { label: "Madhapur", value: "MADHAPUR" },
          ].map((f) => (
            <Link
              key={f.label}
              href={f.value ? `/portal/clients?branch=${f.value}` : "/portal/clients"}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                branch === f.value || (!branch && !f.value)
                  ? "bg-ink text-white"
                  : "bg-ink/[0.05] text-ink/70 hover:bg-ink/10"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Filings</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Link href={`/portal/clients/${client.id}`} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-ink">{client.name}</p>
                        <p className="text-xs text-muted">{client.email}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted">{client.company || "—"}</TableCell>
                  <TableCell>
                    {client.branch && <Badge variant="outline">{client.branch}</Badge>}
                  </TableCell>
                  <TableCell className="text-muted">{client._count.filings}</TableCell>
                  <TableCell className="text-muted">{client._count.invoices}</TableCell>
                  <TableCell className="text-muted">{client._count.tickets}</TableCell>
                </TableRow>
              ))}
              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted">
                    No clients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

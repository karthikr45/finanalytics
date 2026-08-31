import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, Phone, Building2, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { filingStatusVariant, invoiceStatusVariant } from "@/lib/status-styles";
import AddNoteForm from "@/components/portal/add-note-form";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const session = await auth();
  if (session!.user.role === "CLIENT") redirect("/portal/dashboard");

  const { clientId } = await params;

  const client = await prisma.user.findUnique({
    where: { id: clientId, role: "CLIENT" },
    include: {
      filings: { orderBy: { dueDate: "asc" } },
      invoices: { orderBy: { issuedAt: "desc" } },
      notes: { include: { author: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!client) notFound();

  return (
    <div className="space-y-6">
      <Link href="/portal/clients" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      <Card>
        <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-base">{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-xl text-ink">{client.name}</h1>
              <p className="text-sm text-muted">{client.company || "Individual client"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm text-ink/75 sm:grid-cols-2">
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted" />{client.email}</span>
            {client.phone && <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-muted" />{client.phone}</span>}
            {client.company && <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-muted" />{client.company}</span>}
            {client.branch && <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-muted" />{client.branch}</span>}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Filings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {client.filings.length ? (
              client.filings.map((f) => (
                <div key={f.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-ink/85">{f.type} &middot; {f.period}</p>
                    <p className="text-xs text-muted">Due {formatDate(f.dueDate)}</p>
                  </div>
                  <Badge variant={filingStatusVariant[f.status]}>{f.status.replace("_", " ")}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No filings on record.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {client.invoices.length ? (
              client.invoices.map((inv) => (
                <Link key={inv.id} href={`/portal/invoices/${inv.id}`} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-ink/85">{inv.number}</p>
                    <p className="text-xs text-muted">{formatCurrency(inv.amount)}</p>
                  </div>
                  <Badge variant={invoiceStatusVariant[inv.status]}>{inv.status}</Badge>
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted">No invoices on record.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Internal notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <AddNoteForm clientId={client.id} />
          <div className="space-y-4 border-t border-ink/6 pt-5">
            {client.notes.length ? (
              client.notes.map((note) => (
                <div key={note.id} className="text-sm">
                  <p className="text-ink/80">{note.body}</p>
                  <p className="mt-1 text-xs text-muted">{note.author.name} &middot; {formatDate(note.createdAt)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No notes yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

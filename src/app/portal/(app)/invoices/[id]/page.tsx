import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Receipt } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { invoiceStatusVariant, paymentStatusVariant } from "@/lib/status-styles";
import InvoicePayButton from "@/components/portal/invoice-pay-button";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const user = session!.user;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { user: true, payments: { orderBy: { createdAt: "desc" } } },
  });

  if (!invoice) notFound();
  if (invoice.userId !== user.id && user.role === "CLIENT") notFound();

  return (
    <div className="space-y-6">
      <Link href="/portal/invoices" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to invoices
      </Link>

      <Card>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Receipt className="h-3.5 w-3.5" />
              Invoice
            </p>
            <CardTitle className="mt-1 text-2xl">{invoice.number}</CardTitle>
          </div>
          <Badge variant={invoiceStatusVariant[invoice.status]}>{invoice.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Service" value={invoice.service} />
            <Field label="Client" value={invoice.user.name} />
            <Field label="Issued" value={formatDate(invoice.issuedAt)} />
            <Field label="Due" value={formatDate(invoice.dueAt)} />
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-paper-dim p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Amount due</p>
              <p className="font-display mt-1 text-3xl text-ink">{formatCurrency(invoice.amount)}</p>
            </div>
            {user.role === "CLIENT" && invoice.status !== "PAID" && (
              <InvoicePayButton invoiceId={invoice.id} invoiceNumber={invoice.number} />
            )}
          </div>
        </CardContent>
      </Card>

      {invoice.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment history</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoice.payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-ink/6 pb-3 text-sm last:border-0 last:pb-0">
                <div>
                  <p className="text-ink/80">{formatCurrency(p.amount)}</p>
                  <p className="text-xs text-muted">{formatDate(p.createdAt)}</p>
                </div>
                <Badge variant={paymentStatusVariant[p.status]}>{p.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}

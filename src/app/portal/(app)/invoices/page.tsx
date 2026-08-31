import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { invoiceStatusVariant } from "@/lib/status-styles";
import InvoicePayButton from "@/components/portal/invoice-pay-button";

export default async function InvoicesPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = user.role !== "CLIENT";

  const invoices = await prisma.invoice.findMany({
    where: isStaff ? {} : { userId: user.id },
    include: { user: true },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Invoices</h1>
        <p className="mt-1 text-sm text-muted">
          {isStaff ? "Every invoice issued across clients." : "Your invoices — pay outstanding ones directly."}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Service</TableHead>
                {isStaff && <TableHead>Client</TableHead>}
                <TableHead>Due</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Link href={`/portal/invoices/${inv.id}`} className="font-medium text-ink hover:text-emerald">
                      {inv.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted">{inv.service}</TableCell>
                  {isStaff && <TableCell className="text-muted">{inv.user.name}</TableCell>}
                  <TableCell className="text-muted">{formatDate(inv.dueAt)}</TableCell>
                  <TableCell className="font-medium text-ink">{formatCurrency(inv.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={invoiceStatusVariant[inv.status]}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {!isStaff && inv.status !== "PAID" && (
                      <InvoicePayButton invoiceId={inv.id} invoiceNumber={inv.number} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {invoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isStaff ? 7 : 6} className="py-10 text-center text-sm text-muted">
                    No invoices yet.
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

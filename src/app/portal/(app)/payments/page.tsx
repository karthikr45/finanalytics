import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { paymentStatusVariant } from "@/lib/status-styles";

export default async function PaymentsPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = user.role !== "CLIENT";

  const payments = await prisma.payment.findMany({
    where: isStaff ? {} : { userId: user.id },
    include: { user: true, invoice: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Payments</h1>
        <p className="mt-1 text-sm text-muted">
          {isStaff ? "Every payment recorded across clients." : "Your payment history."}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                {isStaff && <TableHead>Client</TableHead>}
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted">{formatDate(p.createdAt)}</TableCell>
                  {isStaff && <TableCell className="text-muted">{p.user.name}</TableCell>}
                  <TableCell>
                    {p.invoice ? (
                      <Link href={`/portal/invoices/${p.invoice.id}`} className="font-medium text-ink hover:text-emerald">
                        {p.invoice.number}
                      </Link>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-ink">{formatCurrency(p.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={paymentStatusVariant[p.status]}>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {payments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isStaff ? 5 : 4} className="py-10 text-center text-sm text-muted">
                    No payments recorded yet.
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

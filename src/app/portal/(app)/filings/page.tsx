import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { filingStatusVariant } from "@/lib/status-styles";
import FilingStatusSelect from "@/components/portal/filing-status-select";

export default async function FilingsPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = user.role !== "CLIENT";

  const filings = await prisma.filing.findMany({
    where: isStaff ? {} : { userId: user.id },
    include: { user: true },
    orderBy: { dueDate: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Filings</h1>
        <p className="mt-1 text-sm text-muted">
          {isStaff ? "Every filing tracked across all clients." : "Your compliance filings, tracked against due dates."}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                {isStaff && <TableHead>Client</TableHead>}
                <TableHead>Due date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filings.map((filing) => (
                <TableRow key={filing.id}>
                  <TableCell className="font-medium text-ink">{filing.type}</TableCell>
                  <TableCell className="text-muted">{filing.period}</TableCell>
                  {isStaff && <TableCell className="text-muted">{filing.user.name}</TableCell>}
                  <TableCell className="text-muted">{formatDate(filing.dueDate)}</TableCell>
                  <TableCell>
                    {isStaff ? (
                      <FilingStatusSelect filingId={filing.id} status={filing.status} />
                    ) : (
                      <Badge variant={filingStatusVariant[filing.status]}>{filing.status.replace("_", " ")}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isStaff ? 5 : 4} className="py-10 text-center text-sm text-muted">
                    No filings yet.
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

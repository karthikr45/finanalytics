import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import LeadStatusSelect from "@/components/portal/lead-status-select";

export default async function LeadsPage() {
  const session = await auth();
  if (session!.user.role === "CLIENT") redirect("/portal/dashboard");

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Leads</h1>
        <p className="mt-1 text-sm text-muted">Captured from the &ldquo;Get a Call Back&rdquo; form on the public site.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-ink">{lead.name}</TableCell>
                  <TableCell className="text-muted">
                    <div>{lead.phone}</div>
                    {lead.email && <div className="text-xs">{lead.email}</div>}
                  </TableCell>
                  <TableCell className="text-muted">{lead.serviceInterest}</TableCell>
                  <TableCell className="text-muted">{lead.experienceLevel || "—"}</TableCell>
                  <TableCell className="text-muted">{formatDate(lead.createdAt)}</TableCell>
                  <TableCell>
                    <LeadStatusSelect leadId={lead.id} status={lead.status} />
                  </TableCell>
                </TableRow>
              ))}
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted">
                    No leads yet.
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

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ticketStatusVariant } from "@/lib/status-styles";
import NewTicketDialog from "@/components/portal/new-ticket-dialog";
import TicketStatusSelect from "@/components/portal/ticket-status-select";

export default async function TicketsPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = user.role !== "CLIENT";

  const tickets = await prisma.ticket.findMany({
    where: isStaff ? {} : { userId: user.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl text-ink">Tickets</h1>
          <p className="mt-1 text-sm text-muted">
            {isStaff ? "Support queries from every client." : "Raise a query and track its status."}
          </p>
        </div>
        {!isStaff && <NewTicketDialog />}
      </div>

      {tickets.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted">
            No tickets yet.
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{ticket.subject}</CardTitle>
                <p className="mt-1 text-xs text-muted">
                  {isStaff ? `${ticket.user.name} · ` : ""}
                  {formatDate(ticket.createdAt)}
                </p>
              </div>
              {isStaff ? (
                <TicketStatusSelect ticketId={ticket.id} status={ticket.status} />
              ) : (
                <Badge variant={ticketStatusVariant[ticket.status]}>{ticket.status.replace("_", " ")}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-ink/75">{ticket.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

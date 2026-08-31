import Link from "next/link";
import {
  FileText,
  Receipt,
  FolderOpen,
  LifeBuoy,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, daysFromNow } from "@/lib/utils";
import { filingStatusVariant } from "@/lib/status-styles";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user;

  if (user.role === "CLIENT") {
    const [nextFiling, unpaidInvoices, recentDocs, openTickets] = await Promise.all([
      prisma.filing.findFirst({
        where: { userId: user.id, status: { in: ["PENDING", "IN_PROGRESS", "OVERDUE"] } },
        orderBy: { dueDate: "asc" },
      }),
      prisma.invoice.findMany({
        where: { userId: user.id, status: { in: ["UNPAID", "OVERDUE"] } },
        orderBy: { dueAt: "asc" },
      }),
      prisma.document.findMany({ where: { userId: user.id }, orderBy: { uploadedAt: "desc" }, take: 4 }),
      prisma.ticket.findMany({ where: { userId: user.id, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    ]);

    const outstandingTotal = unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted">Here&rsquo;s where things stand on your account.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Next filing due"
            value={nextFiling ? formatDate(nextFiling.dueDate) : "None due"}
            sub={nextFiling?.type}
            href="/portal/filings"
          />
          <StatCard
            icon={Receipt}
            label="Outstanding invoices"
            value={formatCurrency(outstandingTotal)}
            sub={`${unpaidInvoices.length} invoice${unpaidInvoices.length === 1 ? "" : "s"}`}
            href="/portal/invoices"
          />
          <StatCard
            icon={FolderOpen}
            label="Recent documents"
            value={String(recentDocs.length)}
            sub="Last 4 uploads"
            href="/portal/documents"
          />
          <StatCard
            icon={LifeBuoy}
            label="Open tickets"
            value={String(openTickets.length)}
            sub="Awaiting response"
            href="/portal/tickets"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming & recent filings</CardTitle>
              <Link href="/portal/filings" className="text-xs font-semibold text-emerald hover:text-emerald-light">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextFiling ? (
                <FilingRow filing={nextFiling} />
              ) : (
                <EmptyRow text="No filings due right now." />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent documents</CardTitle>
              <Link href="/portal/documents" className="text-xs font-semibold text-emerald hover:text-emerald-light">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDocs.length ? (
                recentDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between text-sm">
                    <span className="text-ink/80">{doc.name}</span>
                    <span className="text-xs text-muted">{formatDate(doc.uploadedAt)}</span>
                  </div>
                ))
              ) : (
                <EmptyRow text="No documents uploaded yet." />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // STAFF / ADMIN view
  const [totalClients, filingsDueThisWeek, overdueFilings, openTicketsCount, recentLeads] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.filing.count({
      where: {
        status: { in: ["PENDING", "IN_PROGRESS"] },
        dueDate: { lte: daysFromNow(7) },
      },
    }),
    prisma.filing.findMany({
      where: { status: "OVERDUE" },
      include: { user: true },
      orderBy: { dueDate: "asc" },
      take: 5,
    }),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Team dashboard</h1>
        <p className="mt-1 text-sm text-muted">Pipeline overview across all clients.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total clients" value={String(totalClients)} href="/portal/clients" />
        <StatCard icon={FileText} label="Filings due (7 days)" value={String(filingsDueThisWeek)} href="/portal/filings" />
        <StatCard icon={AlertTriangle} label="Overdue filings" value={String(overdueFilings.length)} href="/portal/filings" tone="danger" />
        <StatCard icon={LifeBuoy} label="Open tickets" value={String(openTicketsCount)} href="/portal/tickets" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Overdue filings</CardTitle>
            <Link href="/portal/filings" className="text-xs font-semibold text-emerald hover:text-emerald-light">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueFilings.length ? (
              overdueFilings.map((f) => (
                <div key={f.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-ink/85">{f.type} &middot; {f.period}</p>
                    <p className="text-xs text-muted">{f.user.name}</p>
                  </div>
                  <Badge variant={filingStatusVariant[f.status]}>{f.status.replace("_", " ")}</Badge>
                </div>
              ))
            ) : (
              <EmptyRow text="Nothing overdue. Clean sheet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent leads</CardTitle>
            <Link href="/portal/leads" className="text-xs font-semibold text-emerald hover:text-emerald-light">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLeads.length ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-ink/85">{lead.name}</p>
                    <p className="text-xs text-muted">{lead.serviceInterest}</p>
                  </div>
                  <Badge variant="outline">{lead.status}</Badge>
                </div>
              ))
            ) : (
              <EmptyRow text="No leads yet." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  sub?: string;
  href: string;
  tone?: "default" | "danger";
}) {
  return (
    <Link href={href} className="card-lift block rounded-2xl border border-ink/8 bg-white p-5">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone === "danger" ? "bg-danger-soft text-danger" : "bg-emerald-soft text-emerald"}`}>
        <Icon className="h-4 w-4" strokeWidth={1.85} />
      </div>
      <p className="mt-3 font-display text-xl text-ink">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
      {sub && <p className="mt-1 text-[0.7rem] text-ink/40">{sub}</p>}
    </Link>
  );
}

function FilingRow({ filing }: { filing: { id: string; type: string; period: string; dueDate: Date; status: keyof typeof filingStatusVariant } }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-ink/85">{filing.type} &middot; {filing.period}</p>
        <p className="text-xs text-muted">Due {formatDate(filing.dueDate)}</p>
      </div>
      <Badge variant={filingStatusVariant[filing.status]}>{filing.status.replace("_", " ")}</Badge>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 py-2 text-sm text-muted">
      <ArrowRight className="h-3.5 w-3.5" />
      {text}
    </div>
  );
}

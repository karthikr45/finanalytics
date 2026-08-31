import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { services as serviceContent } from "../src/lib/services-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database…");

  // --- Services (mirrors src/lib/services-content.ts, for future CMS use) ---
  for (const [i, s] of serviceContent.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        category: s.category,
        summary: s.summary,
        body: s.body,
        icon: s.icon.displayName || s.slug,
        order: i,
      },
      create: {
        slug: s.slug,
        title: s.title,
        category: s.category,
        summary: s.summary,
        body: s.body,
        icon: s.icon.displayName || s.slug,
        order: i,
      },
    });
  }
  console.log(`  ✓ ${serviceContent.length} services`);

  // --- Demo users (one per role) ---
  const password = (plain: string) => bcrypt.hash(plain, 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@aksharafinalytics.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@aksharafinalytics.com",
      passwordHash: await password("Admin@123"),
      role: "ADMIN",
      phone: "9999900001",
      branch: "MADHAPUR",
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@aksharafinalytics.com" },
    update: {},
    create: {
      name: "Priya Rao",
      email: "staff@aksharafinalytics.com",
      passwordHash: await password("Staff@123"),
      role: "STAFF",
      phone: "9999900002",
      branch: "MADHAPUR",
    },
  });

  const client1 = await prisma.user.upsert({
    where: { email: "client@aksharafinalytics.com" },
    update: {},
    create: {
      name: "Ravi Kumar",
      email: "client@aksharafinalytics.com",
      passwordHash: await password("Client@123"),
      role: "CLIENT",
      phone: "9999900003",
      company: "Kumar Textiles Pvt Ltd",
      branch: "HIMAYATNAGAR",
    },
  });

  const client2 = await prisma.user.upsert({
    where: { email: "anita@example.com" },
    update: {},
    create: {
      name: "Anita Desai",
      email: "anita@example.com",
      passwordHash: await password("Client@123"),
      role: "CLIENT",
      phone: "9999900004",
      company: "Desai Consulting",
      branch: "MADHAPUR",
    },
  });

  console.log("  ✓ demo users (admin, staff, 2 clients)");

  // --- Filings ---
  const now = new Date();
  const inDays = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

  await prisma.filing.createMany({
    data: [
      { userId: client1.id, type: "GSTR-3B", period: "Aug 2026", dueDate: inDays(5), status: "PENDING" },
      { userId: client1.id, type: "ITR", period: "AY 2026-27", dueDate: inDays(45), status: "IN_PROGRESS" },
      { userId: client1.id, type: "ROC Annual Filing", period: "FY 2025-26", dueDate: inDays(-3), status: "OVERDUE" },
      { userId: client2.id, type: "GSTR-1", period: "Aug 2026", dueDate: inDays(2), status: "PENDING" },
      { userId: client2.id, type: "TDS Return", period: "Q1 FY26-27", dueDate: inDays(-10), status: "FILED" },
    ],
    skipDuplicates: true,
  });
  console.log("  ✓ filings");

  // --- Documents ---
  await prisma.document.createMany({
    data: [
      { userId: client1.id, name: "PAN Card.pdf", fileUrl: "/uploads/demo/pan-card.pdf", category: "PAN_AADHAAR" },
      { userId: client1.id, name: "GST Certificate.pdf", fileUrl: "/uploads/demo/gst-certificate.pdf", category: "GST" },
      { userId: client2.id, name: "Bank Statement - Jul 2026.pdf", fileUrl: "/uploads/demo/bank-statement.pdf", category: "BANK_STATEMENT" },
    ],
    skipDuplicates: true,
  });
  console.log("  ✓ documents");

  // --- Invoices ---
  const inv1 = await prisma.invoice.upsert({
    where: { number: "AF-INV-2026-0142" },
    update: {},
    create: {
      userId: client1.id,
      number: "AF-INV-2026-0142",
      service: "GST Compliance — Q1 FY26-27",
      amount: 1500000, // ₹15,000 in paise
      status: "UNPAID",
      dueAt: inDays(10),
    },
  });

  const inv2 = await prisma.invoice.upsert({
    where: { number: "AF-INV-2026-0098" },
    update: {},
    create: {
      userId: client1.id,
      number: "AF-INV-2026-0098",
      service: "Company Incorporation",
      amount: 2500000,
      status: "PAID",
      dueAt: inDays(-30),
    },
  });

  const inv3 = await prisma.invoice.upsert({
    where: { number: "AF-INV-2026-0151" },
    update: {},
    create: {
      userId: client2.id,
      number: "AF-INV-2026-0151",
      service: "Bookkeeping — Aug 2026",
      amount: 800000,
      status: "OVERDUE",
      dueAt: inDays(-5),
    },
  });
  console.log("  ✓ invoices");

  // --- Payments ---
  await prisma.payment.createMany({
    data: [
      {
        userId: client1.id,
        invoiceId: inv2.id,
        amount: inv2.amount,
        status: "SUCCESS",
        razorpayOrderId: "demo_order_seed_1",
        razorpayPaymentId: "demo_pay_seed_1",
      },
    ],
    skipDuplicates: true,
  });
  void inv1;
  void inv3;
  console.log("  ✓ payments");

  // --- Tickets ---
  await prisma.ticket.createMany({
    data: [
      {
        userId: client1.id,
        subject: "Question about GST input credit",
        message: "Can you clarify how input credit is being reconciled for last quarter?",
        status: "OPEN",
      },
      {
        userId: client2.id,
        subject: "Need updated bank statement",
        message: "Please share the categorised expense sheet for July.",
        status: "IN_PROGRESS",
      },
    ],
    skipDuplicates: true,
  });
  console.log("  ✓ tickets");

  // --- Client notes (staff-authored) ---
  await prisma.clientNote.create({
    data: {
      clientId: client1.id,
      authorId: staff.id,
      body: "Prefers WhatsApp updates over email. ROC filing flagged overdue — following up this week.",
    },
  });
  console.log("  ✓ client notes");

  // --- Leads ---
  await prisma.lead.createMany({
    data: [
      { name: "Sanjay Mehta", phone: "9876543210", email: "sanjay@example.com", serviceInterest: "GST Services", experienceLevel: "First time seeking consultancy", status: "NEW" },
      { name: "Fatima Sheikh", phone: "9876543211", serviceInterest: "Company Registration", experienceLevel: "1–3 years", status: "CONTACTED" },
      { name: "Vikram Rathod", phone: "9876543212", email: "vikram@example.com", serviceInterest: "Accounting Outsourcing", status: "CONVERTED" },
    ],
    skipDuplicates: true,
  });
  console.log("  ✓ leads");

  console.log("\nDemo logins:");
  console.log("  Admin  — admin@aksharafinalytics.com / Admin@123");
  console.log("  Staff  — staff@aksharafinalytics.com / Staff@123");
  console.log("  Client — client@aksharafinalytics.com / Client@123");
  void admin;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

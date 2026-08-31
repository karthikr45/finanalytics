import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/mailer";
import { brand } from "@/lib/site-content";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, phone, email, serviceInterest, experienceLevel, message } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      name,
      phone,
      email: email || null,
      serviceInterest,
      experienceLevel,
      message,
    },
  });

  const notifyTo = process.env.LEADS_NOTIFY_EMAIL || brand.email;
  await sendEmail({
    to: notifyTo,
    subject: `New lead: ${name} — ${serviceInterest}`,
    html: `
      <h2>New "Get a Call Back" lead</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>
      <p><strong>Service interested in:</strong> ${serviceInterest}</p>
      <p><strong>Experience with consultancy:</strong> ${experienceLevel || "—"}</p>
      <p><strong>Message:</strong> ${message || "—"}</p>
    `,
  }).catch((err) => console.error("[leads] notify email failed", err));

  return NextResponse.json({ ok: true, id: lead.id });
}

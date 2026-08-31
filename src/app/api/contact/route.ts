import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/mailer";
import { brand } from "@/lib/site-content";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, phone, email, branch, message } = parsed.data;

  await sendEmail({
    to: process.env.LEADS_NOTIFY_EMAIL || brand.email,
    subject: `New contact form message from ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Preferred branch:</strong> ${branch || "—"}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  }).catch((err) => console.error("[contact] notify email failed", err));

  return NextResponse.json({ ok: true });
}

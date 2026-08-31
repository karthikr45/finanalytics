import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

// Self-registration always creates a CLIENT account. Staff/Admin accounts
// are provisioned by an existing Admin from the portal (see
// /portal/settings for admins) rather than through this public endpoint.
export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, company, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, phone, company, passwordHash, role: "CLIENT" },
  });

  return NextResponse.json({ ok: true });
}

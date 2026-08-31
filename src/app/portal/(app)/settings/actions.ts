"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(data: { name: string; phone?: string; company?: string }) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: data.name, phone: data.phone, company: data.company },
  });
  revalidatePath("/portal/settings");
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("Not found");

  const valid = await bcrypt.compare(data.currentPassword, user.passwordHash);
  if (!valid) throw new Error("Current password is incorrect");

  const passwordHash = await bcrypt.hash(data.newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
}

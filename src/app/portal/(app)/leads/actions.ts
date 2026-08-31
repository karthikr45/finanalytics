"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { LeadStatus } from "@prisma/client";

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const session = await auth();
  if (!session?.user || session.user.role === "CLIENT") throw new Error("Not authorized");

  await prisma.lead.update({ where: { id: leadId }, data: { status } });
  revalidatePath("/portal/leads");
  revalidatePath("/portal/dashboard");
}

"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FilingStatus } from "@prisma/client";

export async function updateFilingStatus(filingId: string, status: FilingStatus) {
  const session = await auth();
  if (!session?.user || session.user.role === "CLIENT") {
    throw new Error("Not authorized");
  }

  await prisma.filing.update({ where: { id: filingId }, data: { status } });
  revalidatePath("/portal/filings");
  revalidatePath("/portal/dashboard");
}

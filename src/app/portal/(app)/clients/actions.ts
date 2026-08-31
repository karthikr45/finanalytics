"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function addClientNote(clientId: string, body: string) {
  const session = await auth();
  if (!session?.user || session.user.role === "CLIENT") throw new Error("Not authorized");
  if (!body.trim()) return;

  await prisma.clientNote.create({
    data: { clientId, authorId: session.user.id, body: body.trim() },
  });
  revalidatePath(`/portal/clients/${clientId}`);
}

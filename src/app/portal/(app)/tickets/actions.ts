"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ticketSchema } from "@/lib/validations";
import type { TicketStatus } from "@prisma/client";

export async function createTicket(input: { subject: string; message: string }) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized");

  const parsed = ticketSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid ticket");

  await prisma.ticket.create({
    data: { userId: session.user.id, subject: parsed.data.subject, message: parsed.data.message },
  });
  revalidatePath("/portal/tickets");
  revalidatePath("/portal/dashboard");
}

export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  const session = await auth();
  if (!session?.user || session.user.role === "CLIENT") throw new Error("Not authorized");

  await prisma.ticket.update({ where: { id: ticketId }, data: { status } });
  revalidatePath("/portal/tickets");
  revalidatePath("/portal/dashboard");
}

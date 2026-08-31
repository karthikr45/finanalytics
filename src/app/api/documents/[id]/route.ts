import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveLocalFile } from "@/lib/storage";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const doc = await prisma.document.findFirst({ where: { fileUrl: `/api/documents/${id}` } });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = doc.userId === session.user.id;
  const isStaff = session.user.role !== "CLIENT";
  if (!isOwner && !isStaff) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const buffer = await readFile(resolveLocalFile(id));
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${doc.name}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveLocalFile } from "@/lib/storage";
import type { DocumentCategory } from "@prisma/client";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const category = (form.get("category") as string) || "OTHER";
  const targetUserId = (form.get("userId") as string) || session.user.id;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (10MB max)" }, { status: 400 });
  }

  // Clients can only upload to their own record; staff/admin may upload
  // on behalf of a client.
  if (session.user.role === "CLIENT" && targetUserId !== session.user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const storedName = await saveLocalFile(buffer, file.name);

  const doc = await prisma.document.create({
    data: {
      userId: targetUserId,
      name: file.name,
      fileUrl: `/api/documents/${storedName}`,
      category: category as DocumentCategory,
    },
  });

  return NextResponse.json({ ok: true, document: doc });
}

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

// S3-compatible storage would plug in here in production (see S3_* env
// vars in .env.example). In this environment, without live S3 credentials,
// uploads are written to a local ./uploads directory outside /public, and
// served back out through /api/documents/[id] with an ownership check —
// so the flow works end-to-end without a live bucket.
const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

export async function saveLocalFile(buffer: Buffer, originalName: string) {
  await mkdir(UPLOAD_ROOT, { recursive: true });
  const safeName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const storedName = `${randomUUID()}-${safeName}`;
  await writeFile(path.join(UPLOAD_ROOT, storedName), buffer);
  return storedName;
}

export function resolveLocalFile(storedName: string) {
  return path.join(UPLOAD_ROOT, storedName);
}

export const isS3Configured = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID);

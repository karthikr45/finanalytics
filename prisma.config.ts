import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Note: only `datasource.url` is needed here for the Prisma CLI (db push /
// migrate / studio). The app's runtime PrismaClient (src/lib/prisma.ts)
// separately constructs its own @prisma/adapter-pg driver adapter, which
// Prisma 7 requires in place of the old inline datasource url.
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});

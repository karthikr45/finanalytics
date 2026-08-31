import type { NextAuthConfig } from "next-auth";

// Edge-safe subset of the auth config — no Prisma, no bcrypt, no providers
// that touch the database. Used by middleware.ts (which runs on the Edge
// runtime) for route gating; the full config with the Credentials provider
// lives in auth.ts and only runs in the Node runtime (API routes, RSCs).
export const authConfig = {
  // Self-hosted deployments (not Vercel) don't auto-detect a trusted host,
  // so NextAuth needs this explicitly — set AUTH_URL/NEXTAUTH_URL to the
  // real deployed origin in production; trustHost alone doesn't skip that.
  trustHost: true,
  pages: { signIn: "/portal/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isPortal = request.nextUrl.pathname.startsWith("/portal");
      const isAuthPage =
        request.nextUrl.pathname === "/portal/login" ||
        request.nextUrl.pathname === "/portal/register";

      if (!isPortal) return true;
      if (isAuthPage) return true; // handled separately in middleware.ts
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;

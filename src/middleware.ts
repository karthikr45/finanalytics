import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const staffOnlyPrefixes = ["/portal/clients", "/portal/leads"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/portal")) return NextResponse.next();

  const isAuthPage = pathname === "/portal/login" || pathname === "/portal/register";
  const isLoggedIn = Boolean(req.auth?.user);

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/portal/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/portal/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = req.auth?.user.role;
  if (role === "CLIENT" && staffOnlyPrefixes.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/portal/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*"],
};

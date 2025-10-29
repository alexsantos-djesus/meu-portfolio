import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) return NextResponse.next();

  // não logado → login
  if (!req.auth) {
    const url = new URL("/login", nextUrl);
    url.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // logado mas não ativo → acesso negado
  const isActive = (req.auth.user as any)?.isActive;
  if (!isActive) {
    return NextResponse.redirect(new URL("/auth/denied", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};

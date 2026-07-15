import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/doctors", "/media", "/users"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
    if (!isProtected) return NextResponse.next();

    const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
    if (isLoggedIn) return NextResponse.next();

    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/doctors/:path*", "/media/:path*", "/users/:path*"],
};

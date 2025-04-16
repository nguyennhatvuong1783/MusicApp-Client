import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/signup", "/login"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (protectedRoutes.includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.nextUrl.pathname === "/profile" && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/signup", "/login", "/profile"],
};

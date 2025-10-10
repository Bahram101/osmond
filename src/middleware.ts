import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];

  // if (pathname.startsWith("/users/create")) {
  //   return NextResponse.next();
  // }

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decoded = await getUserFromToken(req)

    if (pathname.startsWith("/admin")) {
      if (decoded?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

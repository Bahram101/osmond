import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) { 
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

  // 🔹 Если пытается попасть в /admin
  // if (pathname.startsWith("/admin")) {

  //   try {
  //     // const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };

  //     if (decoded.role !== "ADMIN") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   } catch {
  //     // Если токен невалидный → редирект на логин
  //     // return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

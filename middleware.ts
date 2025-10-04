import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth?.token

    console.log('pathname',pathname)
    console.log('tkn',token)

    // Если пользователь не авторизован и идёт не на /auth/*
    if (!token && !pathname.startsWith("/auth")) {
      const url = new URL("/auth/login", req.url)
      return NextResponse.redirect(url)
    }

    // Если пользователь авторизован и пытается попасть на /auth/*
    if (token && pathname.startsWith("/auth")) {
      const url = new URL("/", req.url)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // мы сами решаем логику авторизации выше
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // применять ко всем страницам
}

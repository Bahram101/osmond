import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      )
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

    const res = NextResponse.json({
      user: {
        id: user.id, email: user.email, role: user.role
      }
    }, {
      status: 200
    })

    res.cookies.set("token", token, { httpOnly: true, secure: true })
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
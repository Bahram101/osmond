import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userSelect } from "@/lib/prisma/select";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
      select: userSelect,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      // expiresIn: "1h",
    });

    const res = NextResponse.json(user, {
      status: 200,
    });

    console.log('TOKEN:', token);

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

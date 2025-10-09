import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

interface JwtPayload {
  userId: string;
  role: "USER" | "ADMIN";
}

export async function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: JwtPayload };
    return payload 
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}

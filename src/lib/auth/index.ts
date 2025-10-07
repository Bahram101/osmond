// src/lib/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface JwtPayload {
  userId: string;
  email: string;
}

export function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded; 
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}

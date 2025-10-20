import { request } from "@/lib/api/request.api";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// api/categories/create
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const category = await prisma.category.create({ data });
    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    console.log("e", e);
  }
}


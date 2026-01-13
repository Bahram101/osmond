import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, parentId } = await request.json();
    if (typeof id !== "number") {
      return Response.json({ message: "Invalid category id" }, { status: 400 });
    }
    await prisma.category.update({
      where: { id },
      data: {
        parentId: parentId ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

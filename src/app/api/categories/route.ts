import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//api/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });
    return NextResponse.json(categories);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при получении  категории",
      },
      { status: 500 }
    );
  }
}
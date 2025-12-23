import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// /api/categories
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    if (type === "flat") {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          parentId: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return NextResponse.json(categories);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          message: "Ошибка при получении  категории",
        },
        { status: 500 }
      );
    }
  }
}


// /api/categories
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const category = await prisma.category.create({ data });
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json(
        { message: "Категория с таким названием уже существует" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Произошла ошибка при создании категории" },
      { status: 500 }
    );
  }
}

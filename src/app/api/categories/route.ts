import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//GET /api/categories
export async function GET(_req: NextRequest) {
  try {
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
      orderBy: {
        createdAt: "asc",
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

//POST /api/categories
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

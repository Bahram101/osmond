import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const categoryId = Number((await params).id);
    if (Number.isNaN(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const breadcrumb: { id: number; name: string }[] = [];

    let currentCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });
    if (!currentCategory) {
      return NextResponse.json(
        { message: "Категория не найдена" },
        { status: 404 }
      );
    }

    while (currentCategory) {
      breadcrumb.unshift({
        id: currentCategory.id,
        name: currentCategory.name,
      });
      if (!currentCategory.parentId) break;

      currentCategory = await prisma.category.findUnique({
        where: {
          id: currentCategory?.parentId,
        },
        select: {
          id: true,
          name: true,
          parentId: true,
        },
      });
    }
    return NextResponse.json(breadcrumb, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении хлебных крошек" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const catId = Number((await params).id);

    if (Number.isNaN(catId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: catId },
      select: { id: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Категория не найдена" },
        { status: 404 }
      );
    }

    const products = await prisma.product.findMany({
      where: { categoryId: catId },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении продуктов категории" },
      { status: 500 }
    );
  }
}

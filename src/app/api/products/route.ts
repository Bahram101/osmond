import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        published: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { message: `Ошибка при получении товаров: ${e.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Неизвестная ошибка при получении товаров" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// /api/products
export async function GET(req: NextRequest) {
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
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при получении товаров" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { productSelect } from "../../../../prisma/selects/product.select";

// /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: productSelect,
    });

    return NextResponse.json(products);
  } catch (e) {
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

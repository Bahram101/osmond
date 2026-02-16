import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//api/site/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        quantity: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    
    if (products.length === 0) {
      return NextResponse.json(
        { message: "Товары не найдены" },
        { status: 404 },
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении товаров" },
      { status: 500 },
    );
  }
}

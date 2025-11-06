import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { barcode, quantity = 1 } = await req.json();
    const product = await prisma.product.findUnique({
      where: { barcode },
    });
    console.log('producT',product)
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    if (product.quantity < quantity) {
      return NextResponse.json(
        { message: "Недостаточно товара" },
        { status: 400 }
      );
    }
    const sale = await prisma.sale.create({
      data: {
        productId: product.id,
        quantity,
        price: product.price,
      },
    });
    const updateProduct = await prisma.product.update({
      where: { id: product.id },
      data: { quantity: { decrement: quantity } },
    });
    return NextResponse.json({ sale, updateProduct });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
  }
}

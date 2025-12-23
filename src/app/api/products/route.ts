import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { productSelect } from "../../../../prisma/selects/product.select";
import { getUserFromToken } from "@/lib/auth";
import { generateEAN13 } from "@/lib/utils/helpers";

//GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: productSelect,
      orderBy: { createdAt: "desc" },
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

//POST /api/products/create
export async function POST(req: NextRequest) {
  try {
    const decoded = await getUserFromToken(req);
    const data = await req.json();
    const barcode = generateEAN13();
    const dataParsed = {
      ...data,
      price: Number(data.price),
      categoryId: Number(data.categoryId),
      userId: decoded?.userId,
      published: data.published === "true" || data.published === true,
      barcode,
    };
    const createdProduct = await prisma.product.create({ data: dataParsed });

    return NextResponse.json(
      { success: true, data: createdProduct },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при создании товара!" },
      { status: 400 }
    );
  }
}

import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateEAN13 } from "@/lib/utils/helpers";

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

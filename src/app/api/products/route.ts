import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { productSelect } from "../../../../prisma/selects/product.select";
import { generateEAN13 } from "@/lib/utils/helpers";
import { z } from "zod";

//GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: productSelect,
      orderBy: { name: "desc" },
    });

    const result = products.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? `Ошибка при получении товаров: ${error.message}`
            : "Неизвестная ошибка при получении товаров",
      },
      { status: 500 },
    );
  }
}

//POST /api/products/create
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const productScema = z.object({
      name: z.string().trim().min(1, "Название обязательно"),
      shortName: z.string().trim().min(1, "Короткое название обязательно"),
      description: z.string().trim().optional(),
      price: z.coerce.number().int().min(0),
      masterPrice: z.coerce.number().int().min(0),
      wholesalePrice: z.coerce.number().int().min(0),
      published: z.coerce.boolean(),
    });

    const createdProduct = await prisma.$transaction(async (tx) => {
      const parsed = productScema.parse(body);
      return tx.product.create({
        data: {
          name: parsed.name,
          shortName: parsed.shortName,
          description: parsed.description || null,
          price: parsed.price,
          masterPrice: parsed.masterPrice,
          wholesalePrice: parsed.wholesalePrice,
          published: parsed.published,
          barcode: generateEAN13(),
        },
      });
    });

    return NextResponse.json(
      { success: true, data: createdProduct },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Ошибка при создании товара" },
      { status: 400 },
    );
  }
}

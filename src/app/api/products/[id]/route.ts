import { prisma } from "@/lib/prisma";
import { IParams } from "@/types/category.interface";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// /api/products/id
export async function GET(_req: NextRequest, { params }: IParams) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при получении товара",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updated = await prisma.product.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          { message: "Товар не найден" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "Ошибка при обновлении товара" },
      { status: 500 }
    );
  }
}

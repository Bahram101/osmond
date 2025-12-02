import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// /api/products/id
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        published: true,
        price: true,
        quantity: true,
        categoryId: true,
        createdAt: true,
      },
    });
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: "Ошибка при получении товара",
        },
        { status: 500 }
      );
    }
  }
}

// /api/products/id
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

// /api/products/id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Товаруспешно удален!" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Ошибка при удалении" },
        { status: 500 }
      );
    }
  }
}

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/id
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
    return NextResponse.json(
      {
        message: "Ошибка при получении товара",
      },
      { status: 500 }
    );
  }
}

//PUT /api/products/id
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
    if (e instanceof Error) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Ошибка при обновлении товара" },
      { status: 500 }
    );
  }
}

//DELETE /api/products/id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Товар успешно удален!" });
  } catch (e: any) {
    if (e?.code === "P2003") {
      return NextResponse.json(
        {
          message:
            "Нельзя удалить товар, так как он связан с приходами или продажами.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Ошибка при удалении товара!" },
      { status: 500 }
    );
  }
}

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  try {
    const product = await prisma.product.findUnique({
      where: { id: numericId },
      select: {
        id: true,
        name: true,
        description: true,
        published: true,
        price: true,
        quantity: true,
        barcode: true,
        code: true,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (!numericId) {
      return NextResponse.json(
        { message: "Некорректный ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: numericId },
      data: {
        name: body.name,
        description: body.description ?? null,
        price: body.price ? Number(body.price) : undefined,
        published:
          body.published === true || body.published === "true", 
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Товар не найден" },
        { status: 404 }
      );
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  try {
    const product = await prisma.product.findUnique({ where: { id: numericId } });
    if (!product) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }
    await prisma.product.delete({ where: { id: numericId } });
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

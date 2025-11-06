import { prisma } from "@/lib/prisma";  
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories/id
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { message: "Категория не найдена" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        { message: "Ошибка при получении категории" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Непредвиденная ошибка" },
      { status: 500 }
    );
  }
}

//PUT /api/categories/id
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedCategory);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          message: "Ошибка при обновлении категории",
        },
        {
          status: 500,
        }
      );
    }
  }
}

//DELETE /api/categories/id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { message: "Категория не найдена" },
        { status: 404 }
      );
    }
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Категория успешно удалена" });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        { message: "Ошибка при удалении категории" },
        { status: 500 }
      );
    }
  }
}

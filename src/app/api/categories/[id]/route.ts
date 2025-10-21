import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }) {
  const { id } = params;
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
    console.log("eee", e);
    return NextResponse.json(
      { message: "Ошибка при удалении категории" },
      { status: 500 }
    );
  }
}

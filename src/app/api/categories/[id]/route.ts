import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IParams {
  params: {
    id: string
  }
}

//api/categories/id
export async function DELETE(
  req: Request,
  { params }: IParams
) {
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
    return NextResponse.json(
      { message: "Ошибка при удалении категории" },
      { status: 500 }
    );
  }
}

//api/categories/id
export async function PUT(req: Request, { params }: IParams) {
  try {
    const { id } = params
    const data = await req.json()
    const updatedCategory = await prisma.category.update({ where: { id }, data })

    return NextResponse.json(updatedCategory)
  } catch (e) {
    return NextResponse.json({
      message: 'Ошибка при обновлении категории'
    }, {
      status: 500
    })
  }
}
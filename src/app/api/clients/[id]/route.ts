import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//PUT /api/clients/id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const numericId = Number(id);

    const updated = await prisma.client.update({
      where: { id: numericId },
      data,
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при обновлении клиента",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    const client = await prisma.client.findUnique({ where: { id: numericId } });
    if (!client) {
      return NextResponse.json(
        { message: "Клиент не найден" },
        { status: 404 }
      );
    }

    await prisma.client.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Клиент успешно удален!" });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при удалении клиента",
      },
      { status: 500 }
    );
  }
}

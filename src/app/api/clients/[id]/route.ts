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
        message: "Ошибка при обновлении мастера",
      },
      { status: 500 }
    );
  }
}

//DELETE /api/clients/id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    const client = await prisma.client.findUnique({ where: { id: numericId } });
    if (!client) {
      return NextResponse.json(
        { message: "Мастер не найден" },
        { status: 404 }
      );
    }

    await prisma.client.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Мастер успешно удален!" });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при удалении мастера",
      },
      { status: 500 }
    );
  }
}

//GET /api/clients/id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);
    const client = await prisma.client.findUnique({
      where: { id },
    });

    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении мастера" },
      { status: 500 }
    );
  }
}

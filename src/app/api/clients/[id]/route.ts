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

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients, { status: 200 });

  } catch (e) {

    return NextResponse.json(
      { message: "Ошибка при получении клиентов" },
      { status: 500 }
    );
  }
}

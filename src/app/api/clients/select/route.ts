import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const clients = await prisma.client.findMany({
      where: {
        id: { not: 1 },
      },
      orderBy: { fullName: "asc" },
      select: {
        id: true,
        fullName: true,
        type: true,
      },
    });
    
    return NextResponse.json(clients, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при получении клиентов" },
      { status: 500 },
    );
  }
}

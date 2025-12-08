import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//GET /api/sales
export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(sales);
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при получении список продаж" },
      { status: 500 }
    );
  }
}

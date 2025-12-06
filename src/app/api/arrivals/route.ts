import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/arrivals
export async function GET(req: NextRequest) {
  try {
    const arrivals = await prisma.arrival.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: { id: true, name: true },
        },
      },
    });
    return NextResponse.json(arrivals);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибки при получении списка прихода",
      },
      { status: 500 }
    );
  }
}

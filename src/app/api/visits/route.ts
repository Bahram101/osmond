import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, items } = body;

    if (!clientId || !items?.length) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    );

    const visit = await prisma.$transaction(async (tx) => {
      const visit = await tx.visit.create({
        data: {
          clientId,
          status: "OPEN",
          totalAmount,
        },
      });

      await tx.visitItem.createMany({
        data: items.map((item: any) => ({
          visitId: visit.id,
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
      });

      return visit;
    });

    return NextResponse.json({ visitId: visit.id });
  } catch (error) { 
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

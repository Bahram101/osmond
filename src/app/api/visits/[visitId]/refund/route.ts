import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ visitId: string }> },
) {
  try {
    const visitId = Number((await params)?.visitId);

    if (Number.isNaN(visitId)) {
      return NextResponse.json(
        { message: "Invalid visit id" },
        { status: 400 },
      );
    }

    const { productId, quantity, price } = await req.json();

    const visit = await prisma.visit.findUnique({
      where: {
        id: visitId,
      },
    });

    await prisma.$transaction(async (tx) => {
      await tx.visit.update({
        where: {
          id: visitId,
        },
        data: {
          totalAmount: Number(visit?.totalAmount) - price * quantity,
        },
      });

      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    });

    console.log("visit", visit);

    return NextResponse.json(
      { message: "Возврат успешно выполнено!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

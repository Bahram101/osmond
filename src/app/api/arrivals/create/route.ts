import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, qty, note } = await req.json();

    const qtyNumber = Number(qty);

    if (!productId || !qtyNumber) {
      return NextResponse.json(
        {
          message: "productId и qty обязательны",
        },
        { status: 400 }
      );
    }

    const arrival = await prisma.arrival.create({
      data: {
        productId,
        qty: qtyNumber,
        note,
      },
    });

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantity: { increment: qtyNumber },
      },
    });

    return NextResponse.json(arrival);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при добавлении прихода" },
      { status: 500 }
    );
  }
}

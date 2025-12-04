import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  console.log("POST ARRIVAL");
  try {
    const { productId, qty, note } = await req.json();

    const qtyNumber = Number(qty); // ← преобразуем
    console.log(productId, qtyNumber, note);

    if (!productId || !qtyNumber) {
      return NextResponse.json(
        {
          message: "productId и qty обязательны",
        },
        { status: 400 }
      );
    }

    // Create Arrival
    const arrival = await prisma.arrival.create({
      data: {
        productId,
        qty: qtyNumber,
        note,
      },
    });

    // Update product's qty
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

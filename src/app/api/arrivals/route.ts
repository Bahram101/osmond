import { HttpError } from "@/lib/errors/HttpError";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//POST /api/arrivals
export async function POST(req: NextRequest) {
  try {
    const { productId, qty, purchasePrice, type, note } = await req.json();

    const qtyNumber = Number(qty);
    const priceNumber =
      purchasePrice !== undefined ? Number(purchasePrice) : null;

    if (!productId || qtyNumber <= 0 || !type) {
      return NextResponse.json(
        {
          message: "productId, qty и type обязательны",
        },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new HttpError("Товар не найден", 404);
      }

      if (type === "IN" && product.quantity > 0) {
        throw new HttpError(
          "Нельзя делать приход, пока есть остаток старой партии",
          400
        );
      }

      if (type === "OUT" && product.quantity < qtyNumber) {
        throw new HttpError("Недостаточно товара на складе", 400);
      }

      const movement = await tx.arrival.create({
        data: {
          productId,
          qty: qtyNumber,
          type,
          purchasePrice: type === "IN" ? priceNumber : null,
          note,
        },
      });
      await tx.product.update({
        where: { id: productId },
        data: {
          quantity:
            type === "IN"
              ? { increment: qtyNumber }
              : { decrement: qtyNumber },

          price:
            type === "IN" &&
              priceNumber !== null &&
              product.quantity === 0   // 🔥 добавляем проверку
              ? priceNumber
              : undefined,
        },
      });
      return movement;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        },
      );
    }
    return NextResponse.json(
      { message: "Ошибка при добавлении прихода" },
      { status: 500 },
    );
  }
}

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

    const result = arrivals.map((arrival) => ({
      ...arrival,
      purchasePrice: Number(arrival.purchasePrice)
    }))
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибки при получении списка прихода",
      },
      { status: 500 },
    );
  }
}

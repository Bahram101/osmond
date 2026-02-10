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

    const { visitItemId, quantityToReturn } = await req.json();

    await prisma.$transaction(async (tx) => {
      /** 1. Получаем visitItem */
      const visitItem = await tx.visitItem.findUnique({
        where: { id: visitItemId },
      });

      if (!visitItem || visitItem.visitId !== visitId) {
        throw new Error("Visit item not found");
      }

      if (quantityToReturn <= 0 || quantityToReturn > visitItem.quantity) {
        throw new Error("Invalid return quantity");
      }

      /** 2. Обновляем VisitItem */
      const newQuantity = visitItem.quantity - quantityToReturn;

      await tx.visitItem.update({
        where: { id: visitItemId },
        data: {
          quantity: { decrement: quantityToReturn },
          total:
            newQuantity * visitItem.price +
            (Number(visitItem.servicePrice) ?? 0),
        },
      });

      /** 3. Возвращаем товар на склад */
      await tx.product.update({
        where: {
          id: visitItem.productId,
        },
        data: {
          quantity: { increment: quantityToReturn },
        },
      });

      /** 4. Пересчитываем Visit */
      const items = await tx.visitItem.findMany({
        where: { visitId },
      });

      const totalAmount = items.reduce((sum, i) => sum + i.total, 0);

      const payments = await tx.payment.findMany({
        where: { visitId },
      });

      const paidAmount = payments.reduce((sum, p) => sum + p.amount, 0);

      const overpaid = paidAmount - totalAmount;

      if (overpaid > 0) {
        await tx.payment.create({
          data: {
            visitId,
            amount: -overpaid,
            note: "Возврат денег",
          },
        });
      }

      const status =
        paidAmount === 0
          ? "OPEN"
          : paidAmount < totalAmount
            ? "PARTIAL"
            : "PAID";

      await tx.visit.update({
        where: { id: visitId },
        data: {
          totalAmount,
          status,
        },
      });
    });

    return NextResponse.json(
      { message: "Возврат успешно выполнен!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

import { VisitStatus } from "@/generated/prisma/edge";
import { HttpError } from "@/lib/errors/HttpError";
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
        throw new HttpError("Visit item not found", 404);
      }

      if (quantityToReturn <= 0 || quantityToReturn > visitItem.quantity) {
        throw new HttpError("Invalid return quantity", 400);
      }

      /** 2. Пересчитываем данные VisitItem */

      const newQuantity = visitItem.quantity - quantityToReturn;

      // 🔴 ИЗМЕНЕНО — считаем прибыль за 1 шт
      const profitPerUnit = visitItem.price - Number(visitItem.costPrice);

      // 🔴 ИЗМЕНЕНО — новая прибыль строки
      const newProfit = profitPerUnit * newQuantity;

      // 🔴 ИЗМЕНЕНО — пересчет total
      const newTotal =
        newQuantity * visitItem.price + Number(visitItem.servicePrice ?? 0);

      await tx.visitItem.update({
        where: { id: visitItemId },
        data: {
          quantity: newQuantity,
          total: newTotal,
          profit: newProfit, // 🔴 ИЗМЕНЕНО
        },
      });

      /** 3. Возвращаем товар на склад */
      await tx.product.update({
        where: { id: visitItem.productId },
        data: {
          quantity: { increment: quantityToReturn },
        },
      });

      /** 4. Пересчитываем весь Visit */

      const items = await tx.visitItem.findMany({
        where: { visitId },
      });

      // 🔴 ИЗМЕНЕНО — пересчет totalAmount
      const totalAmount = items.reduce((sum, i) => sum + Number(i.total), 0);

      // 🟢 ДОБАВЛЕНО — пересчет общей прибыли визита
      const totalProfit = items.reduce((sum, i) => sum + Number(i.profit), 0);

      const payments = await tx.payment.findMany({
        where: { visitId },
      });

      const paidAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);

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

      let status: VisitStatus;

      if (totalAmount === 0) {
        status = "PAID";
      } else if (paidAmount === 0) {
        status = "OPEN";
      } else if (paidAmount < totalAmount) {
        status = "PARTIAL";
      } else {
        status = "PAID";
      }

      await tx.visit.update({
        where: { id: visitId },
        data: {
          totalAmount,
          profit: totalProfit, // 🟢 ДОБАВЛЕНО
          status,
        },
      });
    });

    return NextResponse.json(
      { message: "Возврат успешно выполнен!" },
      { status: 200 },
    );
  } catch (error: any) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

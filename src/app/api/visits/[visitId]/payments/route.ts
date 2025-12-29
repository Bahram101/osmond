import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//api/visits/[visitId]/payments
export async function POST(
  req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  try {
    const visitId = Number((await params).visitId);
    if (Number.isNaN(visitId)) {
      return NextResponse.json(
        { message: "Invalid visit id" },
        { status: 400 }
      );
    }

    const { amount, note } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // 1️⃣ Получаем визит + оплаты
    const visit = await prisma.visit.findUnique({
      where: { id: visitId },
      include: { payments: true },
    });

    if (!visit) {
      return NextResponse.json({ message: "Visit not found" }, { status: 404 });
    }

    // 2️⃣ Считаем уже оплачено
    const paidAmount = visit.payments.reduce((sum, p) => sum + p.amount, 0);

    const totalAmount = Number(visit.totalAmount);
    const debtAfterPayment = totalAmount - (paidAmount + amount);

    if (debtAfterPayment < 0) {
      return NextResponse.json(
        { message: "Payment exceeds debt amount" },
        { status: 400 }
      );
    }

    const status = debtAfterPayment === 0 ? "PAID" : "PARTIAL";

    // 3️⃣ Транзакция
    await prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          visitId,
          amount,
          note,
        },
      });

      await tx.visit.update({
        where: { id: visitId },
        data: { status },
      });
    });

    return NextResponse.json({ success: true });
  } catch (e) { 
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

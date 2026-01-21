import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//POST /api/clients/[id]/pay-debt
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const clientId = Number((await params).id);
    if (isNaN(clientId)) {
      return NextResponse.json(
        { message: "Invalid client id" },
        { status: 400 },
      );
    }

    const { amount, note } = await req.json();

    if (!amount || amount <= 0) {
      return Response.json(
        { message: "Invalid payment amount" },
        { status: 400 },
      );
    }

    console.log("body", clientId, amount, note);

    const visits = await prisma.visit.findMany({
      where: { clientId, status: { not: "PAID" } },
      include: { payments: { select: { amount: true } } },
    });

    const debts = visits
      .map((v) => {
        const paid = v.payments.reduce((s, p) => s + Number(p.amount), 0);
        return {
          id: v.id,
          debt: Number(v.totalAmount) - paid,
        };
      })
      .filter((v) => v.debt > 0)
      .sort((a, b) => a.id - b.id);

    console.log("DEBTS", debts);

    let remainingAmount = amount;

    await prisma.$transaction(async (tx) => {
      for (const visit of debts) {
        if (remainingAmount <= 0) break;

        const pay =
          remainingAmount >= visit.debt ? visit.debt : remainingAmount;

        remainingAmount -= pay;

        await tx.payment.create({
          data: {
            visitId: visit.id,
            amount: pay,
            note,
          },
        });

        await tx.visit.update({
          where: { id: visit.id },
          data: {
            status: pay === visit.debt ? "PAID" : "PARTIAL",
          },
        });
      }
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//POST /api/clients/[id]/pay-debt
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clientId = Number((await params).id);
    if (isNaN(clientId)) {
      return NextResponse.json(
        { message: "Invalid client id" },
        { status: 400 }
      );
    }

    const visitsWithDebt = await prisma.visit.findMany({
      where: { clientId, status: { not: "PAID" } },
      include: {
        payments: {
          select: {
            amount: true,
          },
        },
      },
    });
    console.log(JSON.stringify(visitsWithDebt, null, 2));
    const paidAmount = visitsWithDebt.map((visit) => {
      const paid = visit.payments.reduce((sum, p) => sum + p.amount, 0);
      console.log('paid', paid)
    });

    return NextResponse.json(
      {
        message: `Debt payment processed for client id: ${clientId}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

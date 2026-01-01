import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//GET /api/clients/[id]/visits
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = Number((await params).id);

    if (isNaN(clientId)) {
      return NextResponse.json(
        { message: "Invalid client id" },
        { status: 400 }
      );
    }

    const visits = await prisma.visit.findMany({
      where: { clientId },
      include: {
        payments: {
          select: { amount: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log("visits", visits);

    const result = visits.map((visit) => {
      const paid = visit.payments.reduce((sum, p) => sum + Number(p.amount), 0);

      return {
        id: visit.id,
        date: visit.createdAt,
        totalAmount: Number(visit.totalAmount),
        paidAmount: paid,
        debtAmount: Number(visit.totalAmount) - paid,
        status: visit.status,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

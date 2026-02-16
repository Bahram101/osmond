import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//api/visits/[visitId]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ visitId: string }> },
) {
  try {
    const visitId = Number((await params).visitId);

    if (isNaN(visitId)) {
      return NextResponse.json(
        {
          message: "Invalid visit id",
        },
        { status: 400 },
      );
    }

    const visit = await prisma.visit.findUnique({
      where: { id: visitId },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        payments: true,
        client: {
          select: {
            fullName: true,
          },
        },
      },
    });

    if (!visit) {
      return NextResponse.json(
        {
          message: "Visit not found",
        },
        { status: 404 },
      );
    }

    const paidAmount = visit.payments.reduce(
      (sum, p) => sum + Number(p.amount),
      0,
    );

    return NextResponse.json({
      ...visit,
      items: visit.items.map((item) => ({
        ...item,
        servicePrice: Number(item.servicePrice) || null,
        costPrice: Number(item.costPrice),
        profit: Number(item.profit),
        total: Number(item.total),
      })),
      totalAmount: Number(visit.totalAmount),
      profit: Number(visit.profit),
      paidAmount,
      debtAmount: Number(visit.totalAmount) - paidAmount,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

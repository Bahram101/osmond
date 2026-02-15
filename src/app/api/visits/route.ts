import { Prisma, VisitStatus } from "@/generated/prisma/edge";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { clientId } = body;
    const { items, payNow, walkInClient } = body;

    if (!items?.length) {
      return NextResponse.json(
        { message: "Invalid payload" },
        { status: 400 }
      );
    }

    const visit = await prisma.$transaction(async (tx) => {
      let finalClientId: number;

      // --- клиент ---
      if (clientId) {
        finalClientId = clientId;
      } else if (payNow) {
        finalClientId = 1;
      } else {
        if (!walkInClient?.fullName) {
          throw new Error(
            "Нужно создать клиента для оформления долга"
          );
        }

        const newClient = await tx.client.create({
          data: {
            fullName: walkInClient.fullName,
            phone: walkInClient.phone,
            note: walkInClient.note,
            type: "WALK_IN",
          },
        });

        finalClientId = newClient.id;
      }

      let totalAmount = 0;
      let totalProfit = 0;

      // --- создаем визит ---
      const visit = await tx.visit.create({
        data: {
          clientId: finalClientId,
          status: payNow ? "PAID" : "OPEN",
          totalAmount: 0,
          profit: 0,
        },
      });

      // --- обрабатываем товары ---
      for (const item of items) {

        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.quantity < item.quantity) {
          throw new Error("Недостаточно товара на складе");
        }

        // берем последнюю закупочную цену
        const lastArrival = await tx.arrival.findFirst({
          where: {
            productId: item.productId,
            type: "IN",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const costPrice = Number(
          lastArrival?.purchasePrice || 0
        );

        const sellTotal =
          item.price * item.quantity +
          Number(item.servicePrice || 0);

        const profit =
          (item.price - costPrice) * item.quantity;

        totalAmount += sellTotal;
        totalProfit += profit;

        // создаем VisitItem с прибылью
        await tx.visitItem.create({
          data: {
            visitId: visit.id,
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
            servicePrice: new Prisma.Decimal(
              Number(item.servicePrice || 0)
            ),
            total: sellTotal,
            costPrice: new Prisma.Decimal(costPrice),
            profit: new Prisma.Decimal(profit),
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.visit.update({
        where: { id: visit.id },
        data: {
          totalAmount: new Prisma.Decimal(totalAmount),
          profit: new Prisma.Decimal(totalProfit),
        },
      });

      if (payNow) {
        await tx.payment.create({
          data: {
            visitId: visit.id,
            amount: totalAmount,
          },
        });
      }

      return visit;
    });

    return NextResponse.json({ visitId: visit.id });

  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Клиент с таким именем уже существует" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Ошибка продажи" },
      { status: 500 }
    );
  }
}


//GET /api/visits
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const period = searchParams.get("period");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // const where: any = {};

    const where: Prisma.VisitWhereInput = {};

    // 🔹 Период
    if (period === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      where.createdAt = { gte: start, lte: end };
    }

    if (period === "custom" && from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return NextResponse.json(
          { message: "Неверный формат даты" },
          { status: 400 },
        );
      }

      where.createdAt = {
        gte: fromDate,
        lte: toDate,
      };
    }

    if (status) {
      where.status = status as VisitStatus;
    }

    // 🔹 Поиск клиента
    if (search) {
      where.client = {
        fullName: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    const visits = await prisma.visit.findMany({
      where,
      include: {
        payments: {
          select: { amount: true },
        },
        client: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      ...(period ? {} : { take: 30 }),
    });

    const result = visits.map((visit) => {
      const paid = visit.payments.reduce((sum, p) => sum + Number(p.amount), 0);

      return {
        id: visit.id,
        clientName: visit.client.fullName,
        totalAmount: Number(visit.totalAmount),
        paidAmount: paid,
        debtAmount: Number(visit.totalAmount) - paid,
        status: visit.status,
        date: visit.createdAt,
      };
    });

    console.log("Fetched visits:", result.length);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

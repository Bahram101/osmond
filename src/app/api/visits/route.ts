import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//POST /api/visits
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { clientId } = body;
    const { items, payNow, walkInClient } = body;

    console.log("clientId", clientId);
    console.log(items, payNow, walkInClient);

    if (!items?.length) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0,
    );

    const visit = await prisma.$transaction(async (tx) => {
      let finalClientId: number;

      if (clientId) {
        finalClientId = clientId;
      } else if (payNow) {
        const GUEST_CLIENT_ID = 1
        finalClientId = GUEST_CLIENT_ID;
      } else {
        if (!walkInClient?.fullName) {
          throw new Error("Укажите имя клиента для оформления долга");
        }

        const newClient = await tx.client.create({
          data: {
            fullName: walkInClient.fullName,
            note: walkInClient.note,
            type: "WALK_IN",
          },
        });

        finalClientId = newClient.id;
      }

      const visit = await tx.visit.create({
        data: {
          clientId: finalClientId,
          status: payNow ? "PAID" : "OPEN",
          totalAmount,
        },
      });

      await tx.visitItem.createMany({
        data: items.map((item: any) => ({
          visitId: visit.id,
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
      });

      await Promise.all(
        items.map((item: any) => {
          return tx.product.update({
            where: {
              id: item.productId,
              quantity: { gte: item.quantity },
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });
        }),
      );

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
  } catch (error:any) {
    console.log('ERR',error)
    return NextResponse.json(
      { message: error.message },
      { status: 500 },
    );
  }
}

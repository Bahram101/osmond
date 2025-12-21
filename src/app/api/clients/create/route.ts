import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//POST /api/clients/create
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.fullName) {
      return NextResponse.json(
        {
          fullName: "Имя клиента объязательно для заполнения",
        },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({ data });
    return NextResponse.json(
      {
        data: client,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({
      message: "Ошибка при создании клиента",
    }, { status: 500 });
  }
}

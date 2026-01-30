import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:{
        type: "MASTER"
      }
    });

    return NextResponse.json(clients, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при получении мастеров" },
      { status: 500 },
    );
  }
}

//POST /api/clients
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.fullName || !data.username || !data.password) {
      return NextResponse.json(
        {
          message: "Имя, логин и пароль объязательно для заполнения",
        },
        { status: 400 },
      );
    }

    const clientAndUser = await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          fullName: data.fullName,
          phone: data.phone,
          note: data.note,
          type: data.type,
        },
      });

      const user = await tx.user.create({
        data: {
          email: data.email ?? null,
          username: data.username,
          password: data.password,
          clientId: client.id,
          role: data.type,
        },
      });

      return client.id + "/" + user.id;
    });

    return NextResponse.json(
      {
        data: clientAndUser,
      },
      { status: 200 },
    );
  } catch (e: any) {
    console.log("eee", e.message);
    return NextResponse.json(
      {
        message: "Ошибка при создании",
      },
      { status: 500 },
    );
  }
}

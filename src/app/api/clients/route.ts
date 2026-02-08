import { $Enums, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'argon2'

// api/clients
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const clientType = searchParams.get('type')

    const STATUS_ORDER = {
      OPEN: 1,
      PARTIAL: 2,
      PAID: 3,
    } as const;

    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: clientType ? { type: clientType as $Enums.ClientType } : undefined,
      include: {
        visits: {
          // take: 1,
          select: { status: true },
        },
      },
    });

    console.log('clients', clients)

    const res = clients.map(client => ({
      ...client,
      hasDebt: client.visits.some(v => v.status === "OPEN" || v.status === "PARTIAL")
    }))

    // clients.sort(
    //   (a, b) =>
    //     (STATUS_ORDER[a.visits[0]?.status ?? "PAID"] ?? 99) -
    //     (STATUS_ORDER[b.visits[0]?.status ?? "PAID"] ?? 99)
    // );

    let result = res?.map(({ visits, ...client }) => client)

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Ошибка при получении клиентов" },
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
          password: await hash(data.password),
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

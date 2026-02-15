import { $Enums, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "argon2";

// api/clients
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const clientType = searchParams.get("type");

    const clients = await prisma.client.findMany({
      where: {
        id: { not: 1 },
        OR: [
          {
            type: { in: ["MASTER", "WHOLESALER"] },
          },
          {
            AND: [
              { type: "WALK_IN" },
              {
                visits: {
                  some: {
                    status: { in: ["OPEN", "PARTIAL"] },
                  },
                },
              },
            ],
          },
        ],
        ...(clientType && { type: clientType as $Enums.ClientType }),
      },
      orderBy: { createdAt: "desc" },
      include: {
        visits: {
          select: { status: true },
        },
        user: { select: { username: true } },
      },
    });

    const result = clients
      .map((c) => {
        const hasDebt = c.visits.some((v) =>
          ["OPEN", "PARTIAL"].includes(v.status),
        );

        return {
          ...c,
          hasDebt,
          username: c.user?.username ?? null,
        };
      })
      .sort((a, b) => Number(b.hasDebt) - Number(a.hasDebt));

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
    return NextResponse.json(
      {
        message: "Ошибка при создании клиента: " + e.message,
      },
      { status: 500 },
    );
  }
}

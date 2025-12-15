import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name) {
      return NextResponse.json(
        {
          message: "Имя клиента объязательно",
        },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({ data });
    return NextResponse.json(
      {
        success: true,
        data: client,
      },
      { status: 201 }
    );
  } catch (e) {
    
  }
}

import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// /api/products/create
export async function POST(req: NextRequest) {
  try {
    const decoded = await getUserFromToken(req);
    const data = await req.json();
    const dataParsed = {
      ...data,
      price: Number(data.price),
      userId: decoded?.userId,
      published: data.published === "true" || data.published === true,
    };
    const createdProduct = await prisma.product.create({ data: dataParsed });

    return NextResponse.json(
      { success: true, data: createdProduct },
      { status: 201 }
    );
  } catch (e) { 
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "Товар с таким названием уже существует!" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Произошла ошибка при создании товара" },
        { status: 500 }
      );
    }
  }
}

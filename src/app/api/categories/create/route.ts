import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";  
import { NextResponse } from "next/server";

// api/categories/create
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const category = await prisma.category.create({ data });
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "Категория с таким названием уже существует" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Произошла ошибка при создании категории" },
        { status: 500 }
      );
    }
  }
}

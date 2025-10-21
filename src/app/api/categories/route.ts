import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//api/categories
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  console.log('type',type)

  try {
    if (type === "flat") {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          parentId: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return NextResponse.json(categories);
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ошибка при получении  категории",
      },
      { status: 500 }
    );
  }
}

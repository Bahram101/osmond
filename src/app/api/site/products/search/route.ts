import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//api/site/products/search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
      return NextResponse.json([]);
    }

    const words = query.trim().split(" ").filter(Boolean);

    console.log("Search query:", words);

    const products = await prisma.product.findMany({
      where: {
        published: true,
        AND: words.map((word) => ({
          name: {
            contains: word,
            mode: "insensitive",
          },
        })),
      },
      select: {
        id: true,
        name: true,
        quantity: true,
      },
    });

    return NextResponse.json({
      message: "Search endpoint is under construction",
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при поиске товаров" },
      { status: 500 },
    );
  }
}

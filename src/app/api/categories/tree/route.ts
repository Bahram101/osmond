import { prisma } from "@/lib/prisma";
import { CategoryNode } from "@/types/category.interface";
import { NextResponse } from "next/server";

//GET /api/categories/tree

export async function GET() {
  try {
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
      orderBy: {
        id: "asc",
      },
    });

    const byId: Record<number, CategoryNode> = {};
    const tree: CategoryNode[] = [];

    categories.forEach((cat) => {
      byId[cat.id] = { ...cat, children: [] };
    });

    Object.values(byId).forEach((node) => {
      if (node.parentId !== null) {
        byId[node.parentId]?.children.push(node);
      } else {
        tree.push(node);
      }
    });

    return NextResponse.json(tree);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

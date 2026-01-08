import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//GET /api/categories/tree

type CategoryNode = {
  id: number;
  name: string;
  parentId: number | null;
  children: CategoryNode[];
};

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parentId: true,
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

  console.log("byId-1", JSON.stringify(byId, null, 2));
  
  Object.values(byId).forEach((node) => {
    if (node.parentId) {
      byId[node.parentId]?.children.push(node);
    } else {
      tree.push(node);
    }
  });
  
  console.log("categories", categories);
  console.log("byId-2", JSON.stringify(byId, null, 2));
  console.log("tree", JSON.stringify(tree, null, 2));

  return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
}

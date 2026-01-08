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

  // console.log("categories", categories);

  // const map = new Map<number, CategoryNode>();

  // categories.forEach((cat) => {
  //   map.set(cat.id, { ...cat, children: [] });
  // });

  // const tree: CategoryNode[] = [];

  // console.log("map", map);

  // map.forEach((cat) => {
  //   console.log("cat", cat);
  // });

  for (const cat of categories) {
    // 1. Создаём текущую категорию, если её ещё нет
    if (!byId[cat.id]) {
      byId[cat.id] = {
        id: cat.id,
        name: cat.name,
        parentId: cat.parentId,
        children: [],
      };
    }

    // 2. Если есть родитель — добавляем в children родителя
    if (cat.parentId !== null) {
      // создаём родителя, если он ещё не создан
      if (!byId[cat.parentId]) {
        byId[cat.parentId] = {
          id: cat.parentId,
          name: "",
          parentId: null,
          children: [],
        };
      }

      byId[cat.parentId].children.push(byId[cat.id]);
    } else {
      // 3. Корневая категория
      tree.push(byId[cat.id]);
    }

    console.log('byId',JSON.stringify(byId, null, 2));
    console.log("tree", JSON.stringify(tree, null, 2));
  }
  return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
}

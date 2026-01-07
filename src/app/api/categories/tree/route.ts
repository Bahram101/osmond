import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type CategoryNode = {
  id: number;
  name: string;
  parentId: number | null;
  children: CategoryNode[]
}

export async function GET() {

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parentId: true,
    },
    orderBy: {
      name: 'asc'
    }
  })
  console.log('categories', categories);

  const map = new Map<number, CategoryNode>();

  categories.forEach(cat => {
    map.set(cat.id, { ...cat, children: [] })
  })

  const tree: CategoryNode[] = []

  console.log('map', map);

  map.forEach(cat => {
    console.log('cat', cat);
  })


  return NextResponse.json({ message: "Not Implemented" }, { status: 501 });
}
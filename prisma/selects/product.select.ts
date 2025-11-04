import { Prisma } from "@prisma/client";

export const productSelect = {
  id: true,
  name: true,
  description: true,
  published: true,
  price: true,
  createdAt: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.ProductSelect;

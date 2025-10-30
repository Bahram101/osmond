import { prisma } from "@/lib/prisma";

export async function GET(req: Request){
  try {
    const products = prisma.product.findMany()
    console.log('prods', products)
  } catch (error) {
    
  }
}
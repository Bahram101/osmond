import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ barcode: string }> }) {
  try {
    const barcode = (await params).barcode

    if (!barcode || barcode.trim().length === 0) {
      return NextResponse.json({ message: 'Invalid barcode' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { barcode }, select: {
        id: true, name: true, price: true, quantity: true
      }
    })

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
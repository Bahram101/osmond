import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { visitId: string } }
) {
  try {
    // const visitId = Number(params.visitId);
    const visitId = Number((await params).visitId);

    console.log("visitID", visitId);

    if (isNaN(visitId)) {
      return NextResponse.json(
        {
          message: "Invalid visit id",
        },
        { status: 400 }
      );
    }

    const visit = await prisma.visit.findUnique({
      where: { id: visitId },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        payments: true,
      },
    });

    if (!visit) {
      return NextResponse.json(
        {
          message: "Visit not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(visit)

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = Number((await params).id);
    console.log("clientId", clientId);
    return NextResponse.json({clientId})
  } catch (error) {}
}

import { NextRequest, NextResponse } from "next/server";

// TODO: GET — return single generation by id
// TODO: DELETE — delete generation by id
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ id }, { status: 200 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ deleted: id }, { status: 200 });
}

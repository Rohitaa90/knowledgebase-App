import { NextRequest, NextResponse } from "next/server";

// TODO: GET — return single generation by id
// TODO: DELETE — delete generation by id
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ id: params.id }, { status: 200 });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ deleted: params.id }, { status: 200 });
}

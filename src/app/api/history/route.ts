import { NextResponse } from "next/server";

// TODO: GET — return all generations for the authenticated user
export async function GET() {
  return NextResponse.json({ history: [] }, { status: 200 });
}

import { NextRequest, NextResponse } from "next/server";

// TODO: Validate session, call generateContent() from lib/gemini.ts, save to DB
export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "TODO: generate content" }, { status: 200 });
}

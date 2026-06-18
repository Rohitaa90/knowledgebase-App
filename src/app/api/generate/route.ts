import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateContent } from "@/lib/gemini";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { templateType, prompt, tone } = await req.json();
  if (!templateType || !prompt)
    return NextResponse.json({ error: "templateType and prompt are required" }, { status: 400 });

  let output: string;
  try {
    output = await generateContent(templateType, prompt, tone);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gemini API error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const generation = await db.generation.create({
    data: { userId: session.user.id, templateType, prompt, tone, output },
  });

  return NextResponse.json({ id: generation.id, output }, { status: 200 });
}

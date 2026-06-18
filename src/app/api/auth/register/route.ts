import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const existing = await db.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  await db.user.create({ data: { email, password: hashed, name } });

  return NextResponse.json({ success: true }, { status: 201 });
}

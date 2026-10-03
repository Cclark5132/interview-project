import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { errorResponse, readJson } from "@/server/http";
import { HttpError } from "@/server/access";

const schema = z.object({
  email: z.string().email().max(200),
  name: z.string().max(100).optional(),
  password: z.string().min(10, "Password must be at least 10 characters").max(200),
});

// Public sign-up always creates a USER. Admin accounts are only created by the local seed script.
export async function POST(req: Request) {
  try {
    const input = schema.parse(await readJson(req, 10_000));
    const email = input.email.trim().toLowerCase();
    if (await db.user.findUnique({ where: { email } })) throw new HttpError(409, "An account with that email already exists");
    await db.user.create({ data: { email, name: input.name?.trim() || null, passwordHash: await bcrypt.hash(input.password, 12), role: "USER" } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    return errorResponse(e);
  }
}

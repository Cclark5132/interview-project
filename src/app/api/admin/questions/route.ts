import { NextResponse } from "next/server";
import { createQuestion } from "@/server/admin";
import { readJson, withActor } from "@/server/http";

export const POST = withActor(async (actor, req) => {
  const q = await createQuestion(actor, await readJson(req));
  return NextResponse.json({ id: q.id }, { status: 201 });
});

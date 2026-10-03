import { NextResponse } from "next/server";
import { updateQuestion } from "@/server/admin";
import { readJson, withActor } from "@/server/http";

export const PUT = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const q = await updateQuestion(actor, id, await readJson(req));
  return NextResponse.json({ id: q.id, rubricVersion: q.rubricVersion });
});

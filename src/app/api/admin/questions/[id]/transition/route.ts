import { NextResponse } from "next/server";
import { z } from "zod";
import { transitionQuestion } from "@/server/admin";
import { readJson, withActor } from "@/server/http";

const schema = z.object({ to: z.enum(["draft", "in_review", "approved", "archived"]), confirmApproval: z.boolean().optional() });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const body = schema.parse(await readJson(req, 1_000));
  return NextResponse.json(await transitionQuestion(actor, id, body.to, { confirmApproval: body.confirmApproval }));
});

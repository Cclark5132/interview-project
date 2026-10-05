import { NextResponse } from "next/server";
import { z } from "zod";
import { requestCaseData } from "@/server/cases";
import { readJson, withActor } from "@/server/http";

const schema = z.object({ stage: z.number().int().min(0).max(20), item: z.number().int().min(0).max(30) });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string; runId: string }> }) => {
  const { id, runId } = await ctx.params;
  const body = schema.parse(await readJson(req, 2_000));
  return NextResponse.json({ view: await requestCaseData(actor.id, id, runId, body.stage, body.item) });
});

import { NextResponse } from "next/server";
import { z } from "zod";
import { answerCaseStage } from "@/server/cases";
import { readJson, withActor } from "@/server/http";

export const maxDuration = 60;

const schema = z.object({ answer: z.string(), requestKey: z.string().max(80).optional() });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string; runId: string }> }) => {
  const { id, runId } = await ctx.params;
  const body = schema.parse(await readJson(req, 30_000));
  return NextResponse.json({ view: await answerCaseStage({ userId: actor.id, questionId: id, runId, answer: body.answer, requestKey: body.requestKey }) });
});

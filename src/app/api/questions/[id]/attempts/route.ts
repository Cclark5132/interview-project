import { NextResponse } from "next/server";
import { z } from "zod";
import { submitAttempt } from "@/server/attempts";
import { readJson, withActor } from "@/server/http";
import { ipLimit } from "@/server/ratelimit";

export const maxDuration = 60;

const schema = z.object({
  answer: z.string(),
  inputMode: z.enum(["typed", "transcribed"]).default("typed"),
  requestKey: z.string().max(80).optional(),
});

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  await ipLimit(req, "grade", 60, 60 * 60_000);
  const body = schema.parse(await readJson(req, 30_000));
  const { attempt, duplicate } = await submitAttempt({ userId: actor.id, questionId: id, answer: body.answer, inputMode: body.inputMode, requestKey: body.requestKey });
  return NextResponse.json({ attempt, duplicate }, { status: attempt.status === "error" ? 502 : 200 });
});

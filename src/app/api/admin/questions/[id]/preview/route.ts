import { NextResponse } from "next/server";
import { z } from "zod";
import { previewGrade } from "@/server/admin";
import { errorResponse, readJson, withActor } from "@/server/http";
import { GradingError } from "@/lib/grading";

const schema = z.object({ sampleAnswer: z.string() });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const { sampleAnswer } = schema.parse(await readJson(req, 30_000));
  try {
    return NextResponse.json(await previewGrade(actor, id, sampleAnswer));
  } catch (e) {
    if (e instanceof GradingError) return NextResponse.json({ error: e.message }, { status: 502 });
    return errorResponse(e);
  }
});

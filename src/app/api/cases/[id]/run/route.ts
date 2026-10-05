import { NextResponse } from "next/server";
import { z } from "zod";
import { startCaseRun } from "@/server/cases";
import { readJson, withActor } from "@/server/http";

const schema = z.object({ fresh: z.boolean().default(false) });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const body = schema.parse(await readJson(req, 2_000).catch(() => ({})));
  return NextResponse.json({ view: await startCaseRun(actor.id, id, body.fresh) });
});

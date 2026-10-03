import { NextResponse } from "next/server";
import { z } from "zod";
import { revealIdeal } from "@/server/attempts";
import { readJson, withActor } from "@/server/http";

const schema = z.object({ confirm: z.boolean() });

export const POST = withActor(async (actor, req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const { confirm } = schema.parse(await readJson(req, 1_000));
  return NextResponse.json(await revealIdeal(actor.id, id, confirm));
});

import { NextResponse } from "next/server";
import { setBookmark } from "@/server/questions";
import { withActor } from "@/server/http";

export const PUT = withActor(async (actor, _req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  return NextResponse.json(await setBookmark(actor.id, id, true));
});

export const DELETE = withActor(async (actor, _req, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  return NextResponse.json(await setBookmark(actor.id, id, false));
});

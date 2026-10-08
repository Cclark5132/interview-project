import { NextResponse } from "next/server";
import { z } from "zod";
import { parseJd } from "@/server/target";
import { readJson, withActor } from "@/server/http";
import { ipLimit, rateLimit } from "@/server/ratelimit";

export const maxDuration = 60;

const schema = z.object({ text: z.string() });

export const POST = withActor(async (actor, req) => {
  await rateLimit(`parse:${actor.id}`, 10, 10 * 60_000, "Too many job descriptions in a short time. Try again in a few minutes.");
  await ipLimit(req, "parse", 30, 10 * 60_000, "Too many job descriptions in a short time. Try again in a few minutes.");
  const { text } = schema.parse(await readJson(req, 40_000));
  return NextResponse.json(await parseJd(text));
});

import { NextResponse } from "next/server";
import { z } from "zod";
import { parseJd } from "@/server/target";
import { readJson, withActor } from "@/server/http";

export const maxDuration = 60;

const schema = z.object({ text: z.string() });

export const POST = withActor(async (_actor, req) => {
  const { text } = schema.parse(await readJson(req, 40_000));
  return NextResponse.json(await parseJd(text));
});

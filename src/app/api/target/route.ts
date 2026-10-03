import { NextResponse } from "next/server";
import { saveTarget } from "@/server/target";
import { readJson, withActor } from "@/server/http";

export const PUT = withActor(async (actor, req) => {
  return NextResponse.json(await saveTarget(actor.id, await readJson(req, 20_000)));
});

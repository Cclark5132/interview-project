import { NextResponse } from "next/server";
import { z } from "zod";
import { importQuestions } from "@/server/admin";
import { parseImportCsv, parseImportJson } from "@/lib/import";
import { readJson, withActor } from "@/server/http";

const schema = z.object({ format: z.enum(["json", "csv"]), content: z.string().max(2_000_000) });

export const POST = withActor(async (actor, req) => {
  const { format, content } = schema.parse(await readJson(req, 2_100_000));
  const parsed = format === "json" ? parseImportJson(content) : parseImportCsv(content);
  return NextResponse.json(await importQuestions(actor, parsed));
});

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { HttpError, loadActor, type Actor } from "./access";

export function errorResponse(e: unknown) {
  if (e instanceof HttpError) return NextResponse.json({ error: e.message, details: e.details }, { status: e.status });
  if (e instanceof ZodError) {
    return NextResponse.json({ error: "Invalid input", details: e.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`) }, { status: 400 });
  }
  console.error("Unhandled API error", e instanceof Error ? e.message : "unknown");
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

/** Wraps a route handler: resolves the signed-in actor (role re-read from DB) and maps errors to JSON. */
export function withActor<A extends unknown[]>(fn: (actor: Actor, req: Request, ...args: A) => Promise<Response>) {
  return async (req: Request, ...args: A) => {
    try {
      return await fn(await loadActor(await getSessionUserId()), req, ...args);
    } catch (e) {
      return errorResponse(e);
    }
  };
}

export async function readJson(req: Request, maxBytes = 200_000): Promise<unknown> {
  const text = await req.text();
  if (text.length > maxBytes) throw new HttpError(413, "Request too large");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "Body must be valid JSON");
  }
}

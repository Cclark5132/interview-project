import { NextResponse } from "next/server";
import { transcribeAudio, TranscriptionError, transcriptionConfigured } from "@/lib/transcribe";
import { errorResponse, withActor } from "@/server/http";
import { ipLimit, rateLimit } from "@/server/ratelimit";

export const maxDuration = 60;

export const GET = withActor(async () => NextResponse.json({ available: transcriptionConfigured() }));

export const POST = withActor(async (actor, req) => {
  try {
    await rateLimit(`transcribe:${actor.id}`, 20, 10 * 60_000, "Too many recordings. Take a short break, or type your answer.");
    await ipLimit(req, "transcribe", 40, 10 * 60_000, "Too many recordings. Take a short break, or type your answer.");
    const form = await req.formData();
    const file = form.get("audio");
    if (!(file instanceof Blob)) return NextResponse.json({ error: "Missing audio" }, { status: 400 });
    const text = await transcribeAudio(file, "answer.webm");
    // Audio is not stored; only the transcript text is returned for the user to review and edit.
    return NextResponse.json({ text });
  } catch (e) {
    if (e instanceof TranscriptionError) return NextResponse.json({ error: e.message }, { status: e.status });
    return errorResponse(e);
  }
});

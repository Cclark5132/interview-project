// Speech transcription adapter. One documented provider (OpenAI audio transcriptions); audio is never persisted.
export const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
export const ALLOWED_AUDIO_TYPES = ["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav", "audio/m4a", "audio/x-m4a"];

export class TranscriptionError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

export type Transcriber = (audio: Blob, filename: string) => Promise<string>;

export function transcriptionConfigured() {
  return Boolean(process.env.OPENAI_API_KEY) && (process.env.TRANSCRIPTION_PROVIDER ?? "openai") === "openai";
}

export const openAiTranscriber: Transcriber = async (audio, filename) => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new TranscriptionError("Speech transcription is not configured on this server. Please type your answer.", 503);
  const form = new FormData();
  form.append("file", audio, filename);
  form.append("model", process.env.TRANSCRIPTION_MODEL || "whisper-1");
  form.append("response_format", "json");
  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      signal: AbortSignal.timeout(60_000),
    });
  } catch {
    throw new TranscriptionError("Transcription timed out or could not be reached. Try again or type your answer.");
  }
  if (!res.ok) throw new TranscriptionError("Transcription failed. Try again or type your answer.");
  const data = (await res.json()) as { text?: string };
  if (typeof data.text !== "string") throw new TranscriptionError("Transcription returned no text.");
  return data.text.trim();
};

/** Validates and transcribes; the Blob is dropped afterwards (nothing written to disk or database). */
export async function transcribeAudio(audio: Blob, filename: string, transcriber: Transcriber = openAiTranscriber): Promise<string> {
  if (audio.size === 0) throw new TranscriptionError("The recording was empty.", 400);
  if (audio.size > MAX_AUDIO_BYTES) throw new TranscriptionError("Recording is too large (10 MB max).", 413);
  const base = audio.type.split(";")[0];
  if (!ALLOWED_AUDIO_TYPES.includes(base)) throw new TranscriptionError("Unsupported audio format.", 415);
  const text = await transcriber(audio, filename);
  if (!text) throw new TranscriptionError("No speech was detected. Try again or type your answer.", 422);
  return text;
}

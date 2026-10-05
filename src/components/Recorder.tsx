"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type State = "idle" | "recording" | "transcribing";

/** Records audio in memory, sends it for transcription, then drops it. Nothing is persisted. */
export function Recorder({ onTranscript, disabled }: { onTranscript: (text: string) => void; disabled?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [seconds, setSeconds] = useState(0);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const stream = useRef<MediaStream | null>(null);
  const cancelled = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // null on the server and during hydration, so markup matches; real value afterwards.
  const supported = useSyncExternalStore(
    () => () => {},
    () => typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia,
    () => null,
  );

  useEffect(() => {
    fetch("/api/transcribe")
      .then((r) => r.json())
      .then((j) => setAvailable(Boolean(j.available)))
      .catch(() => setAvailable(false));
    return () => cleanup();
  }, []);

  function cleanup() {
    if (timer.current) clearInterval(timer.current);
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    chunks.current = [];
  }

  async function start() {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = s;
      const r = new MediaRecorder(s);
      rec.current = r;
      chunks.current = [];
      cancelled.current = false;
      r.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      r.onstop = async () => {
        const type = r.mimeType || "audio/webm";
        const blob = new Blob(chunks.current, { type });
        cleanup();
        if (cancelled.current) return setState("idle");
        setState("transcribing");
        try {
          const form = new FormData();
          form.append("audio", blob, "answer.webm");
          const res = await fetch("/api/transcribe", { method: "POST", body: form });
          const j = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(j.error ?? "Transcription failed.");
          onTranscript(j.text);
        } catch (e) {
          setError(`${e instanceof Error ? e.message : "Transcription failed."} You can type your answer instead.`);
        } finally {
          setState("idle");
        }
      };
      r.start();
      setSeconds(0);
      timer.current = setInterval(() => setSeconds((n) => n + 1), 1000);
      setState("recording");
    } catch (e) {
      cleanup();
      const denied = e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError");
      setError(
        denied
          ? "Microphone permission was denied. Allow microphone access in your browser, or type your answer."
          : "No microphone could be started on this device. You can type your answer instead.",
      );
    }
  }

  const stop = () => rec.current?.state === "recording" && rec.current.stop();
  const cancel = () => {
    cancelled.current = true;
    if (rec.current?.state === "recording") rec.current.stop();
    else setState("idle");
  };

  if (supported === null) return null;
  if (!supported) {
    return <p className="text-sm text-muted">Voice recording isn’t supported in this browser. Typing works everywhere.</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {state === "idle" && (
          <button type="button" className="btn" onClick={start} disabled={disabled || available === false}>
            Record answer
          </button>
        )}
        {state === "recording" && (
          <>
            <span className="inline-flex items-center gap-2 text-sm text-danger" role="status">
              <span className="inline-block size-2.5 animate-pulse bg-danger" aria-hidden /> Recording {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </span>
            <button type="button" className="btn btn-primary" onClick={stop}>Stop and transcribe</button>
            <button type="button" className="btn" onClick={cancel}>Cancel</button>
          </>
        )}
        {state === "transcribing" && <span className="text-sm text-muted" role="status">Transcribing…</span>}
      </div>
      {available === false && state === "idle" && (
        <p className="text-sm text-muted">Speech transcription isn’t configured on this server, so recording is unavailable. Please type your answer.</p>
      )}
      {error && <p role="alert" className="rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
    </div>
  );
}

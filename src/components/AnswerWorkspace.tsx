"use client";

import Link from "next/link";
import { useState } from "react";
import { EvaluationCard } from "./EvaluationCard";
import { Recorder } from "./Recorder";
import { compareAttempts } from "@/lib/compare";
import type { AttemptView } from "@/server/attempts";

const MIN = 20;
const MAX = 6000;

export function AnswerWorkspace({
  questionId,
  initialAttempts,
  initialIdeal,
  initialBookmarked,
}: {
  questionId: string;
  initialAttempts: AttemptView[];
  initialIdeal: string | null;
  initialBookmarked: boolean;
}) {
  const [attempts, setAttempts] = useState(initialAttempts);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"typed" | "transcribed">("typed");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ideal, setIdeal] = useState(initialIdeal);
  const [confirming, setConfirming] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [fromSpeech, setFromSpeech] = useState(false);

  const latest = attempts.at(-1);
  const cmp = compareAttempts(attempts);
  const len = text.trim().length;
  const canSubmit = len >= MIN && len <= MAX && !busy;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/questions/${questionId}/attempts`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answer: text, inputMode: mode, requestKey: crypto.randomUUID() }),
      });
      const j = await res.json().catch(() => ({}));
      if (j.attempt) {
        setAttempts((a) => (a.some((x) => x.id === j.attempt.id) ? a : [...a, j.attempt]));
        if (j.attempt.status === "graded") {
          setText("");
          setMode("typed");
          setFromSpeech(false);
        } else setError(j.attempt.errorMessage ?? "Grading failed. Your answer was saved; you can submit again.");
      } else setError(j.error ?? "Could not submit your answer.");
    } catch {
      setError("Network error. Your text is still here; try again.");
    } finally {
      setBusy(false);
    }
  }

  async function reveal() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/questions/${questionId}/reveal`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirm: true }) });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(j.error ?? "Could not reveal the ideal answer.");
    setIdeal(j.idealAnswer);
    setConfirming(false);
  }

  async function toggleBookmark() {
    const next = !bookmarked;
    setBookmarked(next);
    const res = await fetch(`/api/questions/${questionId}/bookmark`, { method: next ? "PUT" : "DELETE" });
    if (!res.ok) setBookmarked(!next);
  }

  return (
    <div className="space-y-8">
      <section className="card p-5" aria-labelledby="ans-h">
        <div className="flex items-start justify-between gap-3">
          <h2 id="ans-h" className="text-xl">{attempts.length === 0 ? "Your answer" : "Try again"}</h2>
          <button type="button" onClick={toggleBookmark} aria-pressed={bookmarked} className="btn !min-h-9">
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
        {ideal && attempts.length > 0 && (
          <p className="mt-2 rounded-[4px] bg-warn-soft px-3 py-2 text-sm text-warn">
            You have revealed the ideal answer, so new attempts are marked as assisted and kept separate from your independent progress.
          </p>
        )}
        <label htmlFor="answer" className="label mt-4">Type your answer, or record and edit the transcript</label>
        <textarea
          id="answer"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={busy}
          className="input leading-relaxed"
          placeholder="Explain your reasoning as you would to an interviewer."
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>{fromSpeech ? "Transcribed from your recording. Review and correct it before submitting." : "Minimum 20 characters."}</span>
          <span className={len > MAX ? "text-danger" : ""}>{len}/{MAX}</span>
        </div>
        <div className="mt-3">
          <Recorder
            disabled={busy}
            onTranscript={(t) => {
              setText((cur) => (cur.trim() ? `${cur.trim()}\n\n${t}` : t));
              setMode("transcribed");
              setFromSpeech(true);
            }}
          />
        </div>
        {error && <p role="alert" className="mt-3 rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" disabled={!canSubmit} onClick={submit}>
            {busy ? "Evaluating…" : "Submit answer"}
          </button>
          {busy && <span className="text-sm text-muted" role="status">Evaluating against the rubric. This can take up to a minute.</span>}
        </div>
      </section>

      {latest && latest.status === "graded" && latest.result && (
        <section aria-labelledby="eval-h" className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 id="eval-h" className="text-xl">Evaluation · attempt {attempts.length}</h2>
            <Link href="/practice" className="btn btn-primary">Next question →</Link>
          </div>
          <EvaluationCard result={latest.result} rubricVersion={latest.rubricVersion} assisted={latest.assisted} />
        </section>
      )}
      {latest && latest.status === "error" && (
        <p className="rounded-[4px] bg-danger-soft px-4 py-3 text-sm text-danger">Attempt {attempts.length} was saved but could not be graded: {latest.errorMessage}</p>
      )}

      {attempts.length > 0 && (
        <section aria-labelledby="hist-h" className="space-y-3">
          <h2 id="hist-h" className="text-xl">Attempt history</h2>
          <div className="card grid gap-px overflow-hidden bg-line sm:grid-cols-3">
            <Stat label="First independent" value={cmp.firstIndependent} sub={`${cmp.independentCount} independent attempt${cmp.independentCount === 1 ? "" : "s"}`} />
            <Stat label="Latest independent" value={cmp.latestIndependent} sub={cmp.independentCount > 1 && cmp.firstIndependent != null && cmp.latestIndependent != null ? `${cmp.latestIndependent - cmp.firstIndependent >= 0 ? "+" : ""}${Math.round(cmp.latestIndependent - cmp.firstIndependent)} vs first` : "—"} />
            <Stat label="Latest assisted" value={cmp.latestAssisted} sub={`${cmp.assistedCount} assisted attempt${cmp.assistedCount === 1 ? "" : "s"} (not counted as independent)`} />
          </div>
          <ol className="space-y-2">
            {[...attempts].reverse().map((a, i) => (
              <li key={a.id} className="card p-4 text-sm">
                <details>
                  <summary className="flex cursor-pointer flex-wrap items-center gap-2">
                    <span className="font-medium">Attempt {attempts.length - i}</span>
                    <span className="text-muted">{new Date(a.createdAt).toLocaleString()}</span>
                    {a.status === "graded" ? <span className="badge">{Math.round(a.overallScore ?? 0)}/100</span> : <span className="badge badge-warn">Not graded</span>}
                    {a.assisted && <span className="badge badge-warn">Assisted</span>}
                    {a.gradingMode === "demonstration" && <span className="badge badge-warn">Demonstration</span>}
                    {a.inputMode === "transcribed" && <span className="badge">Spoken</span>}
                    <span className="badge">Rubric v{a.rubricVersion}</span>
                  </summary>
                  <p className="mt-3 whitespace-pre-wrap rounded-[4px] bg-bg p-3">{a.answerText}</p>
                  {a.result && (
                    <div className="mt-3">
                      <EvaluationCard result={a.result} rubricVersion={a.rubricVersion} assisted={a.assisted} heading={`Attempt ${attempts.length - i}`} />
                    </div>
                  )}
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}

      {attempts.length > 0 && (
        <section aria-labelledby="ideal-h" className="card p-5">
          <h2 id="ideal-h" className="text-xl">Ideal answer</h2>
          {ideal ? (
            <p className="mt-3 whitespace-pre-wrap">{ideal}</p>
          ) : confirming ? (
            <div className="mt-3 space-y-3">
              <p className="rounded-[4px] bg-warn-soft px-3 py-2 text-sm text-warn">
                Revealing the ideal answer is useful for studying, but any attempt you submit afterwards will be marked as assisted and kept separate from your independent progress. You can retry as many times as you like first.
              </p>
              <div className="flex gap-2">
                <button type="button" className="btn btn-primary" onClick={reveal} disabled={busy}>Reveal and mark later attempts as assisted</button>
                <button type="button" className="btn" onClick={() => setConfirming(false)}>Keep trying</button>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-muted">Hidden so you can keep retrying on your own. Reveal it whenever you want to study it.</p>
              <button type="button" className="btn mt-3" onClick={() => setConfirming(true)}>Reveal ideal answer</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number | null; sub: string }) {
  return (
    <div className="bg-surface p-4">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="font-display text-3xl">{value == null ? "—" : Math.round(value)}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  );
}

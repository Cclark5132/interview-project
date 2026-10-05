"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EvaluationCard } from "./EvaluationCard";
import type { CaseView, StageView } from "@/server/cases";

const MIN = 20;
const MAX = 6000;
const KIND_LABEL: Record<StageView["kind"], string> = { structure: "Structure", analysis: "Analysis", math: "Calculation", synthesis: "Recommendation" };

async function post(url: string, body: unknown): Promise<{ view?: CaseView; error?: string }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const j = await res.json().catch(() => ({}));
    return res.ok ? { view: j.view } : { error: j.error ?? "Something went wrong." };
  } catch {
    return { error: "Network error. Your text is still here; try again." };
  }
}

export function CaseWorkspace({ questionId, title, opening, outline, initialView }: { questionId: string; title: string; opening: string; outline: string[]; initialView: CaseView | null }) {
  const [view, setView] = useState<CaseView | null>(initialView);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const stageKey = view ? `${view.runId}:${view.stageIndex}:${view.status}` : "";

  useEffect(() => {
    if (view && view.stages.length > 1) currentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Only when the open stage changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageKey]);

  async function start(fresh: boolean) {
    setBusy(true);
    setError(null);
    const r = await post(`/api/cases/${questionId}/run`, { fresh });
    setBusy(false);
    if (r.view) {
      setView(r.view);
      setText("");
    } else setError(r.error ?? "Could not start the case.");
  }

  async function ask(stage: number, item: number) {
    if (!view) return;
    setError(null);
    const r = await post(`/api/cases/${questionId}/runs/${view.runId}/request`, { stage, item });
    if (r.view) setView(r.view);
    else setError(r.error ?? "Could not get that data.");
  }

  async function submit() {
    if (!view) return;
    setBusy(true);
    setError(null);
    const r = await post(`/api/cases/${questionId}/runs/${view.runId}/answer`, { answer: text, requestKey: crypto.randomUUID() });
    setBusy(false);
    if (r.view) {
      setView(r.view);
      setText("");
    } else setError(r.error ?? "Could not submit your answer.");
  }

  if (!view) {
    return (
      <section className="card space-y-5 p-6" aria-labelledby="case-intro">
        <div>
          <div className="label !mb-2">Staged case · {outline.length} stages</div>
          <h2 id="case-intro" className="text-2xl">Run it like a live interview</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            The interviewer reveals one stage at a time. Ask for the data you need, answer each stage in your own words, and get feedback before moving on. You can only see the next stage after you answer the current one.
          </p>
        </div>
        <ol className="flex flex-wrap gap-2">
          {outline.map((o, i) => (
            <li key={o} className="badge">
              {i + 1} · {o}
            </li>
          ))}
        </ol>
        {error && <p role="alert" className="rounded-[6px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
        <button type="button" className="btn btn-primary" onClick={() => start(false)} disabled={busy}>
          {busy ? "Starting…" : "Start the case →"}
        </button>
      </section>
    );
  }

  const len = text.trim().length;
  const complete = view.status === "complete";

  return (
    <div className="space-y-8">
      <nav aria-label="Case progress" className="card flex flex-wrap items-center gap-x-1 gap-y-2 px-4 py-3">
        {outline.map((o, i) => {
          const done = i < view.stageIndex || complete;
          const open = i === view.stageIndex && !complete;
          return (
            <div key={o} className="flex items-center gap-1">
              <span className={`grid size-5 place-items-center rounded-full font-mono text-[10px] ${done ? "bg-accent text-bg" : open ? "border border-accent text-accent" : "border border-strong text-muted"}`}>{done ? "✓" : i + 1}</span>
              <span className={`pr-2 text-[12.5px] ${open ? "font-medium text-ink" : "text-muted"}`}>{o}</span>
              {i < outline.length - 1 && <span aria-hidden className="mr-1 hidden h-px w-4 bg-strong sm:block" />}
            </div>
          );
        })}
      </nav>

      <div className="rounded-[10px] border border-line bg-surface-2 p-5">
        <div className="label !mb-2">Interviewer</div>
        <p className="whitespace-pre-wrap text-[17px] leading-relaxed">{opening}</p>
      </div>

      {view.stages.map((st) => {
        const open = !st.done;
        return (
          <section key={st.index} ref={open ? currentRef : undefined} aria-labelledby={`stage-${st.index}`} className="rise scroll-mt-24 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted">Stage {st.index + 1} of {view.totalStages}</span>
              <span className="badge">{KIND_LABEL[st.kind]}</span>
            </div>
            <h2 id={`stage-${st.index}`} className="text-2xl">{st.title}</h2>
            <div className="rounded-[10px] border border-line bg-surface-2 p-5">
              <div className="label !mb-2">Interviewer</div>
              <p className="whitespace-pre-wrap text-[16px] leading-relaxed">{st.prompt}</p>
            </div>
            {st.exhibit && (
              <figure className="card overflow-hidden">
                <figcaption className="border-b border-line px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.09em] text-muted">Exhibit</figcaption>
                <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">{st.exhibit}</pre>
              </figure>
            )}
            {st.given.map((g) => (
              <div key={g.index} className="rise rounded-[10px] border border-accent/30 bg-accent-soft p-4">
                <div className="label !mb-1.5 !text-accent">You asked: {g.label}</div>
                <p className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed">{g.content}</p>
              </div>
            ))}

            {open ? (
              <div className="space-y-4">
                {st.askable.length > 0 && (
                  <div>
                    <div className="label !mb-2">Ask the interviewer for data</div>
                    <div className="flex flex-wrap gap-2">
                      {st.askable.map((a) => (
                        <button key={a.index} type="button" onClick={() => ask(st.index, a.index)} disabled={busy} className="cursor-pointer rounded-[6px] border border-strong bg-surface-2 px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent">
                          + {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="card p-5">
                  <label htmlFor={`ans-${st.index}`} className="label">Your response</label>
                  <textarea id={`ans-${st.index}`} rows={st.kind === "math" ? 6 : 9} value={text} onChange={(e) => setText(e.target.value)} disabled={busy} className="input leading-relaxed" placeholder={st.kind === "math" ? "Show your working and state the final number with units." : "Answer as you would out loud to the interviewer."} />
                  <div className="mt-1 flex justify-between text-xs text-muted">
                    <span>Minimum {MIN} characters. Show your reasoning, not only conclusions.</span>
                    <span className={len > MAX ? "text-danger" : ""}>{len}/{MAX}</span>
                  </div>
                  {error && <p role="alert" className="mt-3 rounded-[6px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button type="button" className="btn btn-primary" disabled={len < MIN || len > MAX || busy} onClick={submit}>
                      {busy ? "Evaluating…" : st.index + 1 === view.totalStages ? "Submit final recommendation" : "Submit and continue →"}
                    </button>
                    {busy && <span role="status" className="text-sm text-muted">Evaluating this stage. This can take up to a minute.</span>}
                  </div>
                </div>
              </div>
            ) : (
              st.done && (
                <div className="space-y-3">
                  <details className="card px-4 py-3 text-sm">
                    <summary className="cursor-pointer font-medium">Your answer</summary>
                    <p className="mt-3 whitespace-pre-wrap rounded-[6px] bg-bg p-3">{st.done.answerText}</p>
                  </details>
                  {st.done.numeric && (
                    <p className={`rounded-[6px] px-3 py-2 text-sm ${st.done.numeric.ok ? "bg-accent-soft text-accent" : "bg-warn-soft text-warn"}`}>
                      {st.done.numeric.ok
                        ? `Your number matches the expected result of about ${st.done.numeric.expected.toLocaleString()} ${st.done.numeric.unit}.`
                        : `The expected result is about ${st.done.numeric.expected.toLocaleString()} ${st.done.numeric.unit}. Your answer did not contain a number close to it, so this stage is capped at 60.`}
                    </p>
                  )}
                  {st.done.result && <EvaluationCard result={st.done.result} heading={`Stage ${st.index + 1}`} />}
                  <details className="card px-4 py-3 text-sm">
                    <summary className="cursor-pointer font-medium">Model answer for this stage</summary>
                    <p className="mt-3 whitespace-pre-wrap leading-relaxed">{st.done.ideal}</p>
                  </details>
                </div>
              )
            )}
          </section>
        );
      })}

      {complete && (
        <section aria-labelledby="case-done" className="card space-y-4 p-6">
          <div className="label !mb-0">Case complete</div>
          <div className="flex flex-wrap items-end gap-3">
            <span className="font-display text-[64px] font-semibold leading-none tabular-nums">{Math.round(view.overall ?? 0)}</span>
            <span className="pb-1 font-mono text-xs text-muted">/100 average across {view.totalStages} stages</span>
          </div>
          <ul className="space-y-2" aria-label="Stage scores">
            {view.stages.map((s) => (
              <li key={s.index} className="grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3 text-sm">
                <span className="truncate text-muted">{s.index + 1}. {s.title}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-strong/50"><span className="block h-full bg-accent" style={{ width: `${Math.round(s.done?.score ?? 0)}%` }} /></span>
                <span className="text-right font-mono text-xs tabular-nums">{Math.round(s.done?.score ?? 0)}</span>
              </li>
            ))}
          </ul>
          {view.gradingMode === "demonstration" && <p className="rounded-[6px] bg-warn-soft px-3 py-2 text-sm text-warn">Scores are demonstration feedback from keyword matching, not a real evaluation.</p>}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/practice" className="btn btn-primary">Next question →</Link>
            <button type="button" className="btn" onClick={() => start(true)} disabled={busy}>Run this case again</button>
          </div>
          <span id="case-done" className="sr-only">{title} finished</span>
        </section>
      )}
    </div>
  );
}

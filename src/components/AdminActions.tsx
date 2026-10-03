"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EvaluationCard } from "./EvaluationCard";
import type { GradeResult } from "@/lib/grading/types";

const NEXT: Record<string, { to: string; label: string }[]> = {
  draft: [{ to: "in_review", label: "Send to review" }],
  in_review: [
    { to: "approved", label: "Approve and publish" },
    { to: "draft", label: "Return to draft" },
  ],
  approved: [{ to: "archived", label: "Archive" }],
  archived: [{ to: "draft", label: "Restore to draft" }],
};

export function TransitionBar({ id, status, problems }: { id: string; status: string; problems: string[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  async function go(to: string) {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/questions/${id}/transition`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ to, confirmApproval: to === "approved" ? confirm : undefined }),
    });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError([j.error, ...(Array.isArray(j.details) ? j.details : [])].filter(Boolean).join(": "));
    setConfirm(false);
    router.refresh();
  }

  return (
    <section className="card space-y-3 p-5" aria-labelledby="wf-h">
      <h2 id="wf-h" className="text-xl">Review workflow</h2>
      <p className="text-sm">
        Status: <span className="badge badge-accent">{status.replace("_", " ")}</span>{" "}
        <span className="text-muted">draft → in review → approved → archived. Only you can approve; generated content never publishes itself.</span>
      </p>
      {status !== "approved" && status !== "archived" && problems.length > 0 && (
        <div className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
          <p className="font-medium">Not ready to publish:</p>
          <ul className="list-disc pl-5">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      )}
      {status === "in_review" && (
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1 size-4 accent-[var(--accent)]" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
          <span>I have reviewed this question, its rubric, ideal answer and provenance, and I approve publishing it. Approving also marks its company associations as reviewed.</span>
        </label>
      )}
      {error && <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {NEXT[status]?.map((n) => (
          <button key={n.to} className={`btn ${n.to === "approved" ? "btn-primary" : ""}`} disabled={busy || (n.to === "approved" && !confirm)} onClick={() => go(n.to)}>
            {n.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function GradingPreview({ id }: { id: string }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/questions/${id}/preview`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ sampleAnswer: text }) });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(j.error ?? "Preview failed.");
    setResult(j);
  }

  return (
    <section className="card space-y-3 p-5" aria-labelledby="gp-h">
      <h2 id="gp-h" className="text-xl">Grading preview</h2>
      <p className="text-sm text-muted">Grades a sample answer against the saved rubric. Not stored and not attached to any user. Save edits first.</p>
      <textarea aria-label="Sample answer" className="input" rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a sample answer (strong, weak, or tricky)" />
      <button className="btn" disabled={busy || text.trim().length < 10} onClick={run}>{busy ? "Grading…" : "Preview grading"}</button>
      {error && <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      {result && <EvaluationCard result={result} heading="Preview" />}
    </section>
  );
}

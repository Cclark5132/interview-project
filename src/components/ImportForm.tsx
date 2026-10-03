"use client";

import { useState } from "react";

export function ImportForm() {
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ created: number; errors: { index: number; message: string }[] } | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFormat(f.name.toLowerCase().endsWith(".csv") ? "csv" : "json");
    setContent(await f.text());
  }

  async function run() {
    setBusy(true);
    setError(null);
    setResult(null);
    const res = await fetch("/api/admin/import", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ format, content }) });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(j.error ?? "Import failed.");
    setResult(j);
  }

  return (
    <div className="card space-y-4 p-5">
      <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
        <div>
          <label className="label" htmlFor="fmt">Format</label>
          <select id="fmt" className="input" value={format} onChange={(e) => setFormat(e.target.value as "json" | "csv")}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="file">File</label>
          <input id="file" type="file" accept=".json,.csv,application/json,text/csv" onChange={onFile} className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="content">Or paste content</label>
        <textarea id="content" className="input font-mono text-xs" rows={12} value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button className="btn btn-primary" disabled={busy || !content.trim()} onClick={run}>{busy ? "Importing…" : "Import as drafts"}</button>
      {error && <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      {result && (
        <div role="status" className="space-y-2 text-sm">
          <p className="rounded-md bg-accent-soft px-3 py-2 text-accent">{result.created} question{result.created === 1 ? "" : "s"} imported as drafts.</p>
          {result.errors.length > 0 && (
            <div className="rounded-md bg-danger-soft px-3 py-2 text-danger">
              <p className="font-medium">{result.errors.length} row{result.errors.length === 1 ? "" : "s"} skipped:</p>
              <ul className="list-disc pl-5">{result.errors.map((e, i) => <li key={i}>Row {e.index}: {e.message}</li>)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

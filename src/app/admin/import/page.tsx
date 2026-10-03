import Link from "next/link";
import { ImportForm } from "@/components/ImportForm";
import { requireAdminPage } from "@/server/session";

export const metadata = { title: "Import questions" };

export default async function ImportPage() {
  await requireAdminPage();
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← Owner review</Link>
        <h1 className="mt-2 text-3xl">Import questions</h1>
        <p className="mt-1 text-muted">
          Import content you wrote or are licensed to use, with source links preserved. Every row lands as a draft; nothing publishes until you approve it. Do not paste material scraped from sites whose terms forbid it.
          Format reference: <code>docs/IMPORT_SCHEMA.md</code>, sample: <code>examples/import-example.json</code>.
        </p>
      </div>
      <ImportForm />
    </div>
  );
}

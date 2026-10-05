import Link from "next/link";
import { EvaluationCard } from "@/components/EvaluationCard";
import { DEMO_ANSWER, DEMO_QUESTION, DEMO_RESULT } from "@/content/demo";

export const metadata = { title: "Demo preview" };

export default function DemoPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[4px] bg-warn-soft px-4 py-3 text-sm text-warn" role="note">
        <strong>Demo preview.</strong> This page is a static illustration of the interface. Nothing here is saved, it is not part of the reviewed question bank, and it never affects your progress.
      </div>
      <div>
        <h1 className="text-3xl">{DEMO_QUESTION.title}</h1>
        <div className="mt-3 flex gap-1.5">
          <span className="badge">{DEMO_QUESTION.discipline}</span>
          <span className="badge">{DEMO_QUESTION.difficulty}</span>
          <span className="badge badge-warn">Demo content</span>
        </div>
      </div>
      <section className="card p-5 sm:p-6">
        <p className="text-lg leading-relaxed">{DEMO_QUESTION.prompt}</p>
      </section>
      <section className="card p-5">
        <h2 className="text-xl">Sample answer</h2>
        <p className="mt-2 rounded-[4px] bg-bg p-3">{DEMO_ANSWER}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl">Sample evaluation</h2>
        <EvaluationCard result={DEMO_RESULT} rubricVersion={1} />
      </section>
      <p className="text-sm text-muted">
        <Link href="/" className="text-accent underline">Set your target</Link> and practice with the reviewed questions. No account needed.
      </p>
    </div>
  );
}

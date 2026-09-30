import { useState } from "react";
import type { QuizBlock } from "../lessons/types";

interface QuizProps {
  quiz: QuizBlock;
}

export function Quiz({ quiz }: QuizProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  function optionStyle(index: number): string {
    if (!answered) return "border-slate-700 hover:border-amber-400";
    if (index === quiz.answer) return "border-emerald-500 bg-emerald-500/10";
    if (index === picked) return "border-rose-500 bg-rose-500/10";
    return "border-slate-700 opacity-60";
  }

  return (
    <section className="space-y-3 rounded-xl border border-amber-500/30 p-5">
      <p className="text-xs font-semibold uppercase text-amber-400">
        Quick check
      </p>
      <p dangerouslySetInnerHTML={{ __html: quiz.question }} />

      <div className="grid gap-2 sm:grid-cols-2">
        {quiz.options.map((option, index) => (
          <button
            key={option}
            type="button"
            disabled={answered}
            onClick={() => setPicked(index)}
            className={`rounded-lg border px-4 py-2 text-left font-mono text-sm ${optionStyle(index)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <p
          className={`rounded-lg p-3 text-sm ${picked === quiz.answer ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
        >
          <strong>
            {picked === quiz.answer ? "✅ Correct!" : "❌ Not quite."}
          </strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: quiz.explanation }} />
        </p>
      )}
    </section>
  );
}

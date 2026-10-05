import { useState, type ReactNode } from "react";

interface QuizProps {
  options: string[];
  answer: string;
  explanation: string;
  children: ReactNode;
}

export function Quiz({ options, answer, explanation, children }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const isCorrect = selected === answer;
  const answered = selected !== null;

  return (
    <div className="not-prose my-6 rounded-xl border border-sky-500/40 bg-sky-500/10 p-4">
      <div className="mb-4 text-slate-300">{children}</div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
              selected === option
                ? isCorrect
                  ? "border border-green-500/40 bg-green-500/10 text-green-300"
                  : "border border-red-500/40 bg-red-500/10 text-red-300"
                : "border border-slate-600/40 bg-slate-700/20 text-slate-300 hover:border-slate-500/60 hover:bg-slate-700/30"
            }`}
            disabled={answered && !isCorrect}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`mt-4 rounded-lg px-4 py-2 text-sm ${
          isCorrect
            ? "border border-green-500/40 bg-green-500/10 text-green-300"
            : "border border-red-500/40 bg-red-500/10 text-red-300"
        }`}>
          {isCorrect ? "✅ Correct! " : "❌ Incorrect. "}
          {explanation}
        </div>
      )}
    </div>
  );
}

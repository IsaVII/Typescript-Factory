import { Link } from "@tanstack/react-router";
import { lessons } from "../lessons";
import { useProgress } from "../progress";

export function HomePage() {
  const { isCompleted } = useProgress();
  const doneCount = lessons.filter((lesson) => isCompleted(lesson.slug)).length;
  const percent = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-slate-50">
          TypeScript Factory 🏭
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          A step-by-step TypeScript course, built with TypeScript.
        </p>
        <div className="max-w-md space-y-1">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Progress</span>
            <span>
              {doneCount} / {lessons.length} lessons
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              to="/lesson/$slug"
              params={{ slug: lesson.slug }}
              className="block h-full space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-400"
            >
              <div className="flex justify-between text-xs">
                <span className="text-amber-400">{lesson.level}</span>
                {isCompleted(lesson.slug) && (
                  <span className="text-emerald-400">✓ done</span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-slate-100">
                {lesson.title}
              </h2>
              <p className="text-sm text-slate-400">{lesson.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

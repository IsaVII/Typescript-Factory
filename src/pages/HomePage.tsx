import { Link } from "@tanstack/react-router";
import { lessons } from "../lessons";

export function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-slate-50">
          TypeScript Factory 🏭
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          A step-by-step TypeScript course, built with TypeScript.
        </p>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              to="/lesson/$slug"
              params={{ slug: lesson.slug }}
              className="block h-full space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-400"
            >
              <span className="text-xs text-amber-400">{lesson.level}</span>
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

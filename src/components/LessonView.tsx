import { Link } from "@tanstack/react-router";
import { lessons } from "../lessons";
import type { Lesson } from "../lessons/types";
import { useProgress } from "../progress";

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const index = lessons.indexOf(lesson);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const { isCompleted, toggle } = useProgress();
  const done = isCompleted(lesson.slug);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-amber-400">{lesson.level}</p>
        <h1 className="text-4xl font-bold text-slate-50">{lesson.title}</h1>
        <p className="text-lg text-slate-400">{lesson.summary}</p>
      </header>

      <div className="prose prose-invert max-w-none prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-800 prose-code:before:content-none prose-code:after:content-none">
        <lesson.Content />
      </div>

      <button
        type="button"
        onClick={() => toggle(lesson.slug)}
        className={
          done
            ? "w-full rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 font-medium text-emerald-300"
            : "w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400"
        }
      >
        {done ? "✓ Completed (click to undo)" : "Mark lesson as complete"}
      </button>

      <nav className="flex justify-between border-t border-slate-800 pt-6 text-sm">
        {previous ? (
          <Link
            to="/lesson/$slug"
            params={{ slug: previous.slug }}
            className="text-slate-400 hover:text-amber-400"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to="/lesson/$slug"
            params={{ slug: next.slug }}
            className="text-slate-400 hover:text-amber-400"
          >
            {next.title} →
          </Link>
        )}
      </nav>
    </article>
  );
}

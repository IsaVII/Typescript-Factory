import { Link } from "@tanstack/react-router";
import { lessons } from "../lessons";
import type { Lesson } from "../lessons/types";
import { BlockView } from "./BlockView";

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const index = lessons.indexOf(lesson);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-amber-400">{lesson.level}</p>
        <h1 className="text-4xl font-bold text-slate-50">{lesson.title}</h1>
        <p className="text-lg text-slate-400">{lesson.summary}</p>
      </header>

      {lesson.blocks.map((block, blockIndex) => (
        <BlockView key={blockIndex} block={block} />
      ))}

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

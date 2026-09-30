import type { Lesson } from "../lessons/types";
import { BlockView } from "./BlockView";

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-16">
      <header className="space-y-2">
        <p className="text-sm text-amber-400">{lesson.level}</p>
        <h1 className="text-4xl font-bold text-slate-50">{lesson.title}</h1>
        <p className="text-lg text-slate-400">{lesson.summary}</p>
      </header>

      {lesson.blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  );
}

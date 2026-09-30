import type { Lesson } from "./types";
import { basicTypes } from "./01-basic-types";
import { objectTypes } from "./02-object-types";

export const lessons: readonly Lesson[] = [basicTypes, objectTypes];

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

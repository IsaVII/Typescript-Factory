import type { Lesson } from "./types";
import { basicTypes } from "./01-basic-types";
import { objectTypes } from "./02-object-types";
import { unionTypes } from "./03-unions";
import { narrowing } from "./04-narrowing";

export const lessons: readonly Lesson[] = [
  basicTypes,
  objectTypes,
  unionTypes,
  narrowing,
];

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

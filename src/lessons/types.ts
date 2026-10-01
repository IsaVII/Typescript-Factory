import type { MDXContent } from "mdx/types";

export const levels = ["basics", "intermediate", "advanced"] as const;
export type Level = (typeof levels)[number];

/** The part of a lesson written in the frontmatter of its .mdx file. */
export interface LessonMeta {
  title: string;
  summary: string;
  level: Level;
}

export interface Lesson extends LessonMeta {
  slug: string;
  Content: MDXContent;
}

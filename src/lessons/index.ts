import type { MDXContent } from "mdx/types";
import { levels, type Lesson, type LessonMeta } from "./types";

/** What Vite gives us for each .mdx file. */
interface MdxModule {
  default: MDXContent;
  frontmatter: unknown;
}

function isLessonMeta(value: unknown): value is LessonMeta {
  return (
    typeof value === "object" &&
    value !== null &&
    "title" in value &&
    typeof value.title === "string" &&
    "summary" in value &&
    typeof value.summary === "string" &&
    "level" in value &&
    levels.some((level) => level === value.level)
  );
}

/** "./content/01-basic-types.mdx" → "basic-types" */
function slugFromPath(path: string): string {
  const fileName = path.split("/").at(-1) ?? path;
  return fileName.replace(/\.mdx$/, "").replace(/^\d+-/, "");
}

const modules = import.meta.glob<MdxModule>("./content/*.mdx", { eager: true });

export const lessons: readonly Lesson[] = Object.entries(modules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, module]) => {
    if (!isLessonMeta(module.frontmatter)) {
      throw new Error(
        `Invalid frontmatter in ${path}. It needs a title, a summary and a level (${levels.join(", ")}).`,
      );
    }
    return {
      ...module.frontmatter,
      slug: slugFromPath(path),
      Content: module.default,
    };
  });

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

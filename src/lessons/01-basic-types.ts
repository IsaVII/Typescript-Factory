import type { Lesson } from "./types";

export const basicTypes = {
  slug: "basic-types",
  title: "1. Types, annotations & inference",
  summary:
    "What a type is, how to write one, and when TypeScript figures it out for you.",
  level: "basics",
  exercise: "exercises/01-type-annotations.ts",
  blocks: [
    {
      kind: "text",
      html: "<p>TypeScript is JavaScript plus <strong>types</strong>. It checks your code before it runs.</p>",
    },
    {
      kind: "code",
      caption: "A type annotation",
      code: `let outputPerTick: number = 2;\noutputPerTick = "fast"; // ❌ error`,
    },
    {
      kind: "quiz",
      question:
        "What type does TypeScript infer for <code>let speed = 10;</code>?",
      options: ["10", "number", "any", "int"],
      answer: 1,
      explanation:
        "A <code>let</code> can change, so TypeScript widens it to <code>number</code>.",
    },
  ],
} satisfies Lesson;

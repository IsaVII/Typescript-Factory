import type { Lesson } from "./types";

export const objectTypes = {
  slug: "object-types",
  title: "2. Object types: type aliases & interfaces",
  summary:
    "Describe the shape of an object, including optional and readonly properties.",
  level: "basics",
  blocks: [
    {
      kind: "text",
      html: "<p>TypeScript describes objects by their <strong>shape</strong>: which properties they have, and the type of each one.</p>",
    },
    {
      kind: "code",
      caption: "type vs interface",
      code: `type Machine = { name: string; rate: number };

interface MachineInterface {
  name: string;
  rate: number;
}`,
    },
    {
      kind: "quiz",
      question:
        "Given <code>interface Crate { label?: string }</code>, what is the type of <code>crate.label</code>?",
      options: ["string", "string | undefined", "string | null", "any"],
      answer: 1,
      explanation:
        "An optional property may be missing, so reading it gives <code>string | undefined</code>.",
    },
  ],
} satisfies Lesson;

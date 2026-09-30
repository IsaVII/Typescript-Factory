export type Level = "basics" | "intermediate" | "advanced";

export type Block =
  | { kind: "text"; html: string }
  | { kind: "code"; code: string; caption?: string }
  | { kind: "tip"; tone: "info" | "warning"; html: string }
  | {
      kind: "quiz";
      question: string;
      options: readonly string[];
      answer: number;
      explanation: string;
    };

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  level: Level;
  blocks: readonly Block[];
  exercise?: string;
}

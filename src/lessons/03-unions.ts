import type { Lesson } from "./types";

export const unionTypes = {
  slug: "union-types",
  title: "3. Union & literal types",
  summary:
    'Say exactly which values are allowed, such as "idle" | "running" | "broken".',
  level: "basics",
  exercise: "exercises/03-unions.ts",
  blocks: [
    {
      kind: "text",
      html: '<p>A <strong>literal type</strong> is a type with exactly one value. <code>"idle"</code> isn\'t just any string. It\'s a type that only allows the string <code>"idle"</code>.</p>',
    },
    {
      kind: "text",
      html: "<h3>Unions: this OR that</h3><p>Combine types with <code>|</code> to make a <strong>union</strong>. A value of a union type can be any one of its members.</p>",
    },
    {
      kind: "code",
      caption: "A union of literal types",
      code: `type MachineStatus = "idle" | "running" | "broken";

let status: MachineStatus = "idle";
status = "running";  // ✅
status = "exploded"; // ❌ Type '"exploded"' is not assignable to type 'MachineStatus'.`,
    },
    {
      kind: "tip",
      tone: "info",
      html: "Compare this to <code>status: string</code>. It would accept any typo. A literal union gives you autocomplete for every allowed value and catches typos as you type.",
    },
    {
      kind: "code",
      caption: "Unions can mix any types",
      code: `type Speed = 1 | 2 | 4;
type Rate = number | string;
type MaybeMachine = Machine | null;`,
    },
    {
      kind: "text",
      html: "<h3>You can only use what all members share</h3><p>With a <code>number | string</code>, TypeScript only allows what works for <em>both</em>. <code>.toUpperCase()</code> exists only on strings, so you have to check which one you have first. That check is called <strong>narrowing</strong>, and it's the next lesson.</p>",
    },
    {
      kind: "code",
      code: `function show(rate: number | string) {
  rate.toUpperCase(); // ❌ Property 'toUpperCase' does not exist on type 'number'.
  rate.toString();    // ✅ both numbers and strings have toString()
}`,
    },
    {
      kind: "quiz",
      question:
        "Which value is allowed for <code>type Speed = 1 | 2 | 4</code>?",
      options: ["3", '"2"', "4", "0"],
      answer: 2,
      explanation:
        'Only the exact numbers 1, 2 and 4 are allowed. <code>"2"</code> is a string, not the number 2.',
    },
    {
      kind: "quiz",
      question:
        "Why use <code>type</code> instead of <code>interface</code> for <code>MachineStatus</code>?",
      options: [
        "interface is deprecated",
        "An interface can only describe object shapes, not unions",
        "type is faster at runtime",
        "There's no difference",
      ],
      answer: 1,
      explanation:
        'Interfaces describe objects. Unions such as <code>"idle" | "running"</code> need a <code>type</code> alias. Neither exists at runtime.',
    },
  ],
} satisfies Lesson;

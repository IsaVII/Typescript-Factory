import type { Lesson } from "./types";

export const narrowing = {
  slug: "narrowing",
  title: "4. Narrowing",
  summary: "Check a value at runtime, and TypeScript learns its precise type.",
  level: "basics",
  exercise: "exercises/04-narrowing.ts",
  blocks: [
    {
      kind: "text",
      html: "<p><strong>Narrowing</strong> is how TypeScript follows your checks. After an <code>if</code>, a <code>switch</code> or an early <code>return</code>, TypeScript knows a more precise type for the variable in that part of the code.</p>",
    },
    {
      kind: "code",
      caption: "typeof: for primitives",
      code: `function formatRate(rate: number | string): string {
  if (typeof rate === "number") {
    return rate.toFixed(1); // here: number
  }
  return rate.toUpperCase(); // here: string (the only option left)
}`,
    },
    {
      kind: "code",
      caption: "Checking for null: the early return",
      code: `const app = document.querySelector<HTMLDivElement>("#app"); // HTMLDivElement | null
if (!app) throw new Error("missing #app");
app.innerHTML = "hi"; // here: HTMLDivElement`,
    },
    {
      kind: "code",
      caption: "instanceof: for classes (like DOM elements)",
      code: `function handle(target: EventTarget | null) {
  if (target instanceof HTMLButtonElement) {
    target.disabled = true; // here: HTMLButtonElement
  }
}`,
    },
    {
      kind: "text",
      html: "<h3>Discriminated unions</h3><p>When every member of a union has a shared field with a different literal value, such as <code>kind</code>, checking that field narrows the whole object. This is how <code>BlockView.tsx</code> in this app works.</p>",
    },
    {
      kind: "code",
      code: `type Machine =
  | { kind: "sawmill"; planksPerTick: number }
  | { kind: "conveyor"; speed: number };

function describe(machine: Machine): string {
  switch (machine.kind) {
    case "sawmill":
      return "Planks: " + machine.planksPerTick; // only sawmill fields here
    case "conveyor":
      return "Speed: " + machine.speed;
    default: {
      const unhandled: never = machine; // error if a kind is forgotten
      throw new Error("Unknown machine: " + JSON.stringify(unhandled));
    }
  }
}`,
    },
    {
      kind: "tip",
      tone: "info",
      html: "<code>never</code> is the type with no values. If every case is handled, nothing is left for <code>default</code>, so <code>machine</code> is <code>never</code> there. Add a new machine kind and forget to handle it, and this line becomes a compile error.",
    },
    {
      kind: "tip",
      tone: "warning",
      html: "Narrowing only happens through checks TypeScript can see. <code>machine as Sawmill</code> is a <strong>type assertion</strong>: it tells TypeScript to trust you without checking anything. Prefer a real check.",
    },
    {
      kind: "quiz",
      question:
        'Inside <code>if (typeof x === "string") { … }</code>, where <code>x: string | number | null</code>, what is the type of <code>x</code>?',
      options: ["string | number | null", "string", "string | null", "unknown"],
      answer: 1,
      explanation:
        "The <code>typeof</code> check leaves only <code>string</code>.",
    },
    {
      kind: "quiz",
      question:
        "What is the type of a variable in a <code>default</code> branch after every case of a union has been handled?",
      options: ["any", "unknown", "never", "undefined"],
      answer: 2,
      explanation:
        "No possibilities are left, so the type is <code>never</code>. That's what makes the exhaustiveness check work.",
    },
  ],
} satisfies Lesson;

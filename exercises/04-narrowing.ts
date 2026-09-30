// Exercise 04 — Narrowing
// Run it:   npm run exercise exercises/04-narrowing.ts
// Check it: npm run check

// ── Task 1: typeof ────────────────────────────────────────────────────────
// A rate can be a number (planks per tick) or a text label like "fast".
// Numbers → "2.0/tick" (use .toFixed(1)).  Strings → upper-case ("FAST").
function formatRate(rate: number | string): string {
  if (typeof rate === "number") {
    return `${rate.toFixed(1)}/tick`;
  } else {
    return rate.toUpperCase();
  }
  return ""; // TODO: narrow with typeof
}

console.log(formatRate(2)); //     expected: 2.0/tick
console.log(formatRate("fast")); // expected: FAST

// ── Task 2: discriminated union ───────────────────────────────────────────
type Machine =
  | { kind: "sawmill"; planksPerTick: number }
  | { kind: "smelter"; ingotsPerTick: number; fuel: number }
  | { kind: "conveyor"; speed: number };

// Return one sentence per machine kind, e.g.
//   sawmill  → "Sawmill: 2 planks/tick"
//   smelter  → "Smelter: 1 ingots/tick (fuel: 80)"
//   conveyor → "Conveyor: speed 4"
// Use `switch (machine.kind)` and finish with the `never` check.
function describeMachine(machine: Machine): string {
  switch (machine.kind) {
    case "sawmill":
      return `Sawmill: ${machine.planksPerTick} planks/tick`;
    case "smelter":
      return `Smelter: ${machine.ingotsPerTick} ingots/tick (fuel: ${machine.fuel})`;
    case "conveyor":
      return `Conveyor: speed ${machine.speed}`;
    default:
      const _exhaustiveCheck: never = machine;
      return _exhaustiveCheck;
  }

  return ""; // TODO
}

const factory: Machine[] = [
  { kind: "sawmill", planksPerTick: 2 },
  { kind: "smelter", ingotsPerTick: 1, fuel: 80 },
  { kind: "conveyor", speed: 4 },
];
factory.forEach((machine) => console.log(describeMachine(machine)));

// ── Task 3: the `never` check in action ───────────────────────────────────
// When Task 2 works, add a fourth member to `Machine`:
//   | { kind: "assembler"; recipe: string }
// Run `npm run check`, find the error, and fix describeMachine.

// ── Task 4: null checks ───────────────────────────────────────────────────
// Return the machine's kind in upper case, or "NO MACHINE" when it's null.
function machineLabel(machine: Machine | null): string {
  if (machine === null) {
    return "NO MACHINE";
  }
  return machine.kind.toUpperCase();
}

console.log(machineLabel(null)); //              expected: NO MACHINE
console.log(machineLabel(factory[0] ?? null)); // expected: SAWMILL

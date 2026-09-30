// Exercise 03 — Union & literal types

type MachineStatus = "idle" | "running" | "broken";

function setStatus(status: MachineStatus): void {
  console.log(`Status is now: ${status}`);
}

setStatus("running");

function statusColor(status: MachineStatus): string {
  switch (status) {
    case "idle":
      return "text-slate-400";
    case "running":
      return "text-emerald-400";
    case "broken":
      return "text-rose-400";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}

console.log(statusColor("broken")); // expected: text-rose-400

// ── Task 3 ────────────────────────────────────────────────────────────────
// A union doesn't have to be strings. Make `Speed` accept 1, 2 or 4 — nothing else.
type Speed = 1 | 2 | 4;

const fast: Speed = 4;
const weird: Speed = 1;

console.log(fast, weird);

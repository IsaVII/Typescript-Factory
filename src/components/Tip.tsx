import type { ReactNode } from "react";

interface TipProps {
  tone?: "info" | "warning";
  children: ReactNode;
}

export function Tip({ tone = "info", children }: TipProps) {
  const style =
    tone === "warning"
      ? "border-amber-500/40 bg-amber-500/10"
      : "border-sky-500/40 bg-sky-500/10";

  return (
    <aside
      className={`not-prose my-6 flex gap-3 rounded-xl border p-4 text-slate-300 ${style} [&_code]:rounded [&_code]:bg-slate-800 [&_code]:px-1 [&_code]:font-mono [&_code]:text-amber-300`}
    >
      <span aria-hidden="true">{tone === "warning" ? "⚠️" : "💡"}</span>
      <div>{children}</div>
    </aside>
  );
}

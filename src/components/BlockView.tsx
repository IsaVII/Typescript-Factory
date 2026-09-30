import type { Block } from "../lessons/types";
import { Quiz } from "./Quiz";

interface BlockViewProps {
  block: Block;
}

export function BlockView({ block }: BlockViewProps) {
  switch (block.kind) {
    case "text":
      return (
        <div
          className="space-y-3 leading-relaxed text-slate-300"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "code":
      return (
        <figure className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {block.caption && (
            <figcaption className="border-b border-slate-800 px-4 py-2 text-xs uppercase text-slate-400">
              {block.caption}
            </figcaption>
          )}
          <pre className="overflow-x-auto p-4 font-mono text-sm text-slate-200">
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case "tip": {
      const style =
        block.tone === "warning"
          ? "border-amber-500/40 bg-amber-500/10"
          : "border-sky-500/40 bg-sky-500/10";
      return (
        <aside
          className={`rounded-xl border p-4 ${style}`}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    }

    case "quiz":
      return <Quiz quiz={block} />;

    default: {
      const unhandled: never = block;
      throw new Error(`Unknown block kind: ${JSON.stringify(unhandled)}`);
    }
  }
}

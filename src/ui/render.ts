import type { Block, Lesson } from "../lessons/types";

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderBlock(block: Block, index: number): string {
  switch (block.kind) {
    case "text":
      return `<div class="space-y-3 leading-relaxed text-slate-300">${block.html}</div>`;

    case "code":
      return `
        <figure class="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          ${block.caption ? `<figcaption class="border-b border-slate-800 px-4 py-2 text-xs uppercase text-slate-400">${block.caption}</figcaption>` : ""}
          <pre class="overflow-x-auto p-4 font-mono text-sm text-slate-200"><code>${escapeHtml(block.code)}</code></pre>
        </figure>`;

    case "tip": {
      const style =
        block.tone === "warning"
          ? "border-amber-500/40 bg-amber-500/10"
          : "border-sky-500/40 bg-sky-500/10";
      return `<aside class="rounded-xl border p-4 ${style}">${block.html}</aside>`;
    }

    case "quiz":
      return `
        <section data-block="${index}" class="space-y-3 rounded-xl border border-amber-500/30 p-5">
          <p class="text-xs font-semibold uppercase text-amber-400">Quick check</p>
          <p>${block.question}</p>
          <div class="grid gap-2 sm:grid-cols-2">
            ${block.options
              .map(
                (option, i) => `
                <button data-option="${i}" class="rounded-lg border border-slate-700 px-4 py-2 text-left font-mono text-sm hover:border-amber-400 disabled:hover:border-inherit">
                  ${escapeHtml(option)}
                </button>`,
              )
              .join("")}
          </div>
          <p data-feedback hidden class="rounded-lg p-3 text-sm"></p>
        </section>`;

    default: {
      const unhandled: never = block;
      throw new Error(`Unknown block kind: ${JSON.stringify(unhandled)}`);
    }
  }
}

export function renderLesson(lesson: Lesson): string {
  return `
    <article class="mx-auto max-w-3xl space-y-8 px-4 py-16">
      <header class="space-y-2">
        <p class="text-sm text-amber-400">${lesson.level}</p>
        <h1 class="text-4xl font-bold text-slate-50">${lesson.title}</h1>
        <p class="text-lg text-slate-400">${lesson.summary}</p>
      </header>
      ${lesson.blocks.map(renderBlock).join("")}
    </article>`;
}

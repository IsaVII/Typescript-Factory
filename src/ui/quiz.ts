import type { Lesson } from "../lessons/types";

export function setupQuizzes(container: HTMLElement, lesson: Lesson): void {
  container.addEventListener("click", (event) => {
    // 1. Which element was clicked?
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>(
      "button[data-option]",
    );
    const section = button?.closest<HTMLElement>("section[data-block]");
    if (!button || !section) return;

    // 2. Look up the quiz data for this section
    const block = lesson.blocks[Number(section.dataset.block)];
    if (!block || block.kind !== "quiz") return;

    // 3. Show the result
    const picked = Number(button.dataset.option);
    const isCorrect = picked === block.answer;

    const buttons = section.querySelectorAll<HTMLButtonElement>(
      "button[data-option]",
    );
    buttons.forEach((btn) => {
      btn.disabled = true;
      const option = Number(btn.dataset.option);
      if (option === block.answer) {
        btn.classList.replace("border-slate-700", "border-emerald-500");
        btn.classList.add("bg-emerald-500/10");
      } else if (option === picked) {
        btn.classList.replace("border-slate-700", "border-rose-500");
        btn.classList.add("bg-rose-500/10");
      }
    });

    const feedback = section.querySelector<HTMLElement>("[data-feedback]");
    if (feedback) {
      feedback.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Not quite."}</strong> ${block.explanation}`;
      feedback.classList.add(
        isCorrect ? "bg-emerald-500/10" : "bg-rose-500/10",
      );
      feedback.hidden = false;
    }
  });
}

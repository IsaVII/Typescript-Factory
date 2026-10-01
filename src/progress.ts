import { useSyncExternalStore } from "react";
import { isStringArray, load, save } from "./storage";

const STORAGE_KEY = "ts-factory:completed";

let completed: readonly string[] = load<string[]>(
  STORAGE_KEY,
  [],
  isStringArray,
);
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): readonly string[] {
  return completed;
}

function setCompleted(slug: string, done: boolean): void {
  if (done === completed.includes(slug)) return; // nothing changes

  completed = done ? [...completed, slug] : completed.filter((s) => s !== slug);
  save(STORAGE_KEY, completed);
  listeners.forEach((listener) => listener());
}

export function useProgress() {
  const done = useSyncExternalStore(subscribe, getSnapshot);

  return {
    isCompleted: (slug: string) => done.includes(slug),
    toggle: (slug: string) => setCompleted(slug, !done.includes(slug)),
  };
}

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "ts-factory:completed";

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function load<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked (e.g. private browsing). Progress just won't be remembered.
  }
}

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

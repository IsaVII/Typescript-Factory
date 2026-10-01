import { describe, expect, test } from "vitest";
import { findLesson, lessons } from ".";

describe("findLesson", () => {
  test("finds a lesson by its slug", () => {
    expect(findLesson("basic-types")?.title).toBe(
      "1. Types, annotations & inference",
    );
  });

  test("returns undefined for an unknown slug", () => {
    expect(findLesson("does-not-exist")).toBeUndefined();
  });
});

describe("course content", () => {
  test("every slug is unique", () => {
    const slugs = lessons.map((lesson) => lesson.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("every slug is URL-friendly", () => {
    for (const lesson of lessons) {
      expect(lesson.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});

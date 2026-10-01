import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { isStringArray, load } from "./storage";

describe("isStringArray", () => {
  test("accepts arrays of strings", () => {
    expect(isStringArray([])).toBe(true);
    expect(isStringArray(["basic-types", "narrowing"])).toBe(true);
  });

  test("rejects everything else", () => {
    expect(isStringArray(["ok", 42])).toBe(false);
    expect(isStringArray("basic-types")).toBe(false);
    expect(isStringArray({ broken: true })).toBe(false);
    expect(isStringArray(null)).toBe(false);
  });
});

describe("load", () => {
  // A fake localStorage: just the two methods `load` needs, backed by a Map.
  const data = new Map<string, string>();
  const fakeStorage: Pick<Storage, "getItem" | "setItem"> = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };

  beforeEach(() => {
    data.clear();
    vi.stubGlobal("localStorage", fakeStorage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns the fallback when nothing is saved", () => {
    expect(load("progress", ["default"], isStringArray)).toEqual(["default"]);
  });

  test("returns saved data when it is valid", () => {
    data.set("progress", JSON.stringify(["basic-types"]));
    expect(load("progress", [], isStringArray)).toEqual(["basic-types"]);
  });

  test("returns the fallback when saved data has the wrong shape", () => {
    data.set("progress", JSON.stringify({ broken: true }));
    expect(load("progress", [], isStringArray)).toEqual([]);
  });

  test("returns the fallback when saved data is not valid JSON", () => {
    data.set("progress", "{oops");
    expect(load("progress", [], isStringArray)).toEqual([]);
  });
});

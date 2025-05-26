import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { resizeWorkEntry } from "../resize-work-entry";

import { time } from "./helpers.test";

describe("resizeWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 30), project: "B" },
    { id: 3, startTime: time(13, 30), endTime: time(14, 0), project: "A" },
    { id: 4, startTime: time(14, 0), endTime: null, project: "C" },
  ];

  test("active entry", () => {
    const resize = resizeWorkEntry(entries[3], entries, 30 * 60 * 1000);
    expect(resize).rejects.toEqual("Cannot resize an active timer entry.");
  });

  test("to earlier time", () => {
    const resize = resizeWorkEntry(entries[0], entries, -30 * 60 * 1000);
    expect(resize).resolves.toEqual([
      { id: 1, updates: { endTime: time(10, 30) } },
      { id: 2, updates: { startTime: time(10, 30) } },
    ]);
  });

  test("too far to earlier time", () => {
    const resize = resizeWorkEntry(entries[0], entries, -60 * 60 * 1000);
    expect(resize).rejects.toEqual(
      "Cannot resize entry to end before it starts.",
    );
  });

  test("to later time", () => {
    const resize = resizeWorkEntry(entries[0], entries, 30 * 60 * 1000);
    expect(resize).resolves.toEqual([
      { id: 1, updates: { endTime: time(11, 30) } },
      { id: 2, updates: { startTime: time(11, 30) } },
    ]);
  });

  test("too far to later time", () => {
    const resize = resizeWorkEntry(entries[0], entries, 210 * 60 * 1000);
    expect(resize).rejects.toEqual(
      "Cannot resize entry to end after next entry.",
    );
  });
});

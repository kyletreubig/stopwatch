import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { completeWorkEntry } from "../work-entry-actions";

import { time } from "./helpers.test";

describe("completeWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: null, project: "B" },
  ];

  test("with inactive entry", () => {
    const completed = completeWorkEntry(entries[0], time(12, 0));
    expect(completed).rejects.toEqual(
      "Cannot complete entry that is not an active timer.",
    );
  });

  test("with earlier time", () => {
    const completed = completeWorkEntry(entries[1], time(10, 30));
    expect(completed).rejects.toEqual("End time must be after start time.");
  });

  test("with valid time", () => {
    const completed = completeWorkEntry(entries[1], time(12, 0));
    expect(completed).resolves.toEqual([
      { id: 2, updates: { endTime: time(12, 0) } },
    ]);
  });
});

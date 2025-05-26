import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { splitWorkEntry } from "../split-work-entry";

import { time } from "./helpers.test";

describe("splitWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 0), project: "B" },
    { id: 3, startTime: time(13, 0), endTime: null, project: "A" },
  ];

  test("before start", () => {
    const split = splitWorkEntry(entries[1], time(10, 45));
    expect(split).rejects.toEqual("Cannot split entry before its start time.");
  });

  test("at start", () => {
    const split = splitWorkEntry(entries[1], time(11, 0));
    expect(split).rejects.toEqual("Cannot split entry before its start time.");
  });

  test("after end", () => {
    const split = splitWorkEntry(entries[1], time(13, 30));
    expect(split).rejects.toEqual("Cannot split entry after its end time.");
  });

  test("at end", () => {
    const split = splitWorkEntry(entries[1], time(13, 0));
    expect(split).rejects.toEqual("Cannot split entry after its end time.");
  });

  test("with end", () => {
    const split = splitWorkEntry(entries[1], time(12, 0));
    expect(split).resolves.toEqual([
      {
        id: 2,
        updates: { endTime: time(12, 0) },
      },
      {
        id: 0,
        values: {
          startTime: time(12, 0),
          endTime: time(13, 0),
          project: "B",
        },
      },
    ]);
  });

  test("without end", () => {
    const split = splitWorkEntry(entries[2], time(14, 0));
    expect(split).resolves.toEqual([
      {
        id: 3,
        updates: { endTime: time(14, 0) },
      },
      {
        id: 0,
        values: {
          endTime: null,
          startTime: time(14, 0),
          project: "A",
        },
      },
    ]);
  });
});

import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { mergeWorkEntry } from "../work-entry-actions";

import { time } from "./helpers.test";

describe("mergeWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 0), project: "B" },
    { id: 3, startTime: time(13, 0), endTime: time(14, 0), project: "C" },
  ];

  test("first into prior", () => {
    const entry = entries[0];
    const merged = mergeWorkEntry(entry, entries, "prior");
    expect(merged).rejects.toEqual("Unable to merge entry.");
  });

  test("first into next", () => {
    const entry = entries[0];
    const merged = mergeWorkEntry(entry, entries, "next");
    expect(merged).resolves.toEqual([
      {
        id: 2,
        updates: { startTime: time(10, 0) },
      },
      { id: 1, delete: true },
    ]);
  });

  test("middle into prior", () => {
    const entry = entries[1];
    const merged = mergeWorkEntry(entry, entries, "prior");
    expect(merged).resolves.toEqual([
      {
        id: 1,
        updates: { endTime: time(13, 0) },
      },
      { id: 2, delete: true },
    ]);
  });

  test("middle into next", () => {
    const entry = entries[1];
    const merged = mergeWorkEntry(entry, entries, "next");
    expect(merged).resolves.toEqual([
      {
        id: 3,
        updates: { startTime: time(11, 0) },
      },
      { id: 2, delete: true },
    ]);
  });

  test("last into prior", () => {
    const entry = entries[2];
    const merged = mergeWorkEntry(entry, entries, "prior");
    expect(merged).resolves.toEqual([
      {
        id: 2,
        updates: { endTime: time(14, 0) },
      },
      { id: 3, delete: true },
    ]);
  });

  test("last into next", () => {
    const entry = entries[2];
    const merged = mergeWorkEntry(entry, entries, "next");
    expect(merged).rejects.toEqual("Unable to merge entry.");
  });

  test("penultimate into active", () => {
    const entry = entries[2];
    const active: WorkEntry = {
      id: 4,
      startTime: time(14, 0),
      endTime: null,
      project: "D",
    };
    const withActive = [...entries, active];
    const merged = mergeWorkEntry(entry, withActive, "next");
    expect(merged).resolves.toEqual([
      {
        id: 4,
        updates: { startTime: time(13, 0) },
      },
      { id: 3, delete: true },
    ]);
  });

  test("active into prior", () => {
    const entry: WorkEntry = {
      id: 4,
      startTime: time(14, 0),
      endTime: null,
      project: "D",
    };
    const withActive = [...entries, entry];
    const merged = mergeWorkEntry(entry, withActive, "prior");
    expect(merged).resolves.toEqual([
      {
        id: 3,
        updates: { endTime: null },
      },
      { id: 4, delete: true },
    ]);
  });
});

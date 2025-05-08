import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { shiftEntries, shiftEntry } from "../shift-work-entry";

const time = (hours: number, minutes: number) =>
  new Date(2025, 5, 5, hours, minutes, 0, 0);

describe("shiftEntries", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 30), project: "B" },
    { id: 3, startTime: time(13, 30), endTime: time(14, 0), project: "A" },
    { id: 4, startTime: time(14, 0), endTime: null, project: "C" },
  ];

  test("to earlier time", () => {
    const shifted = shiftEntries(entries, -30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 1, updates: { startTime: time(9, 30), endTime: time(10, 30) } },
      { id: 2, updates: { startTime: time(10, 30), endTime: time(13, 0) } },
      { id: 3, updates: { startTime: time(13, 0), endTime: time(13, 30) } },
      { id: 4, updates: { startTime: time(13, 30), endTime: null } },
    ]);
  });

  test("to later time", () => {
    const shifted = shiftEntries(entries, 30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 1, updates: { startTime: time(10, 30), endTime: time(11, 30) } },
      { id: 2, updates: { startTime: time(11, 30), endTime: time(14, 0) } },
      { id: 3, updates: { startTime: time(14, 0), endTime: time(14, 30) } },
      { id: 4, updates: { startTime: time(14, 30), endTime: null } },
    ]);
  });
});

describe("shiftEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 30), project: "B" },
    { id: 3, startTime: time(13, 30), endTime: time(14, 0), project: "A" },
    { id: 4, startTime: time(14, 0), endTime: null, project: "C" },
  ];

  test("first to earlier time", () => {
    const shifted = shiftEntry(entries[0], entries, -30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 1, updates: { startTime: time(9, 30), endTime: time(10, 30) } },
      { id: 2, updates: { startTime: time(10, 30) } },
    ]);
  });

  test("first to later time", () => {
    const shifted = shiftEntry(entries[0], entries, 30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 1, updates: { startTime: time(10, 30), endTime: time(11, 30) } },
      { id: 2, updates: { startTime: time(11, 30) } },
    ]);
  });

  test("first too far to later time", () => {
    const shifted = shiftEntry(entries[0], entries, 210 * 60 * 1000);
    expect(shifted).rejects.toEqual(
      "Cannot shift entry to end after next entry.",
    );
  });

  test("middle to earlier time", () => {
    const shifted = shiftEntry(entries[1], entries, -30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 1, updates: { endTime: time(10, 30) } },
      { id: 2, updates: { startTime: time(10, 30), endTime: time(13, 0) } },
      { id: 3, updates: { startTime: time(13, 0) } },
    ]);
  });

  test("middle too far to earlier time", () => {
    const shifted = shiftEntry(entries[1], entries, -60 * 60 * 1000);
    expect(shifted).rejects.toEqual(
      "Cannot shift entry to start before prior entry.",
    );
  });

  test("middle to later time", () => {
    const shifted = shiftEntry(entries[2], entries, 30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 2, updates: { endTime: time(14, 0) } },
      { id: 3, updates: { startTime: time(14, 0), endTime: time(14, 30) } },
      { id: 4, updates: { startTime: time(14, 30) } },
    ]);
  });

  test("middle too far to later time", () => {
    const shifted = shiftEntry(entries[1], entries, 30 * 60 * 1000);
    expect(shifted).rejects.toEqual(
      "Cannot shift entry to end after next entry.",
    );
  });

  test("last to earlier time", () => {
    const shifted = shiftEntry(entries[3], entries, -15 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 3, updates: { endTime: time(13, 45) } },
      { id: 4, updates: { startTime: time(13, 45), endTime: null } },
    ]);
  });

  test("last too far to earlier time", () => {
    const shifted = shiftEntry(entries[3], entries, -30 * 60 * 1000);
    expect(shifted).rejects.toEqual(
      "Cannot shift entry to start before prior entry.",
    );
  });

  test("last to later time", () => {
    const shifted = shiftEntry(entries[3], entries, 30 * 60 * 1000);
    expect(shifted).resolves.toEqual([
      { id: 3, updates: { endTime: time(14, 30) } },
      { id: 4, updates: { startTime: time(14, 30), endTime: null } },
    ]);
  });
});

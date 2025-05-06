import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { shiftEntries } from "../shift-work-entry";

const time = (hours: number, minutes: number) =>
  new Date(2025, 5, 5, hours, minutes, 0, 0);

describe("shiftEntries", () => {
  const initialEntries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 30), project: "B" },
    { id: 3, startTime: time(13, 30), endTime: time(14, 0), project: "A" },
    { id: 4, startTime: time(14, 0), endTime: null, project: "C" },
  ];

  test("to earlier time", () => {
    const shifted = shiftEntries(initialEntries, -30 * 60 * 1000);
    expect(shifted).toEqual([
      {
        id: 1,
        updates: { startTime: time(9, 30), endTime: time(10, 30) },
      },
      {
        id: 2,
        updates: { startTime: time(10, 30), endTime: time(13, 0) },
      },
      {
        id: 3,
        updates: { startTime: time(13, 0), endTime: time(13, 30) },
      },
      {
        id: 4,
        updates: { startTime: time(13, 30), endTime: null },
      },
    ]);
  });

  test("to later time", () => {
    const shifted = shiftEntries(initialEntries, 30 * 60 * 1000);
    expect(shifted).toEqual([
      {
        id: 1,
        updates: { startTime: time(10, 30), endTime: time(11, 30) },
      },
      {
        id: 2,
        updates: { startTime: time(11, 30), endTime: time(14, 0) },
      },
      {
        id: 3,
        updates: { startTime: time(14, 0), endTime: time(14, 30) },
      },
      {
        id: 4,
        updates: { startTime: time(14, 30), endTime: null },
      },
    ]);
  });
});

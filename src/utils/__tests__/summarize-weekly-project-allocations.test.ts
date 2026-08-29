import { describe, expect, test } from "vitest";

import type { Project, WorkEntry } from "@/db";

import { summarizeWeeklyProjectAllocations } from "../summarize-weekly-project-allocations";

import { time } from "./helpers.test";

describe("summarizeWeeklyProjectAllocations", () => {
  const projects: Project[] = [
    { id: 1, name: "A", allocation: 50 },
    { id: 2, name: "B", allocation: 40 },
    { id: 3, name: "C", allocation: 10 },
  ];

  const entries: WorkEntry[] = [
    { id: 1, project: "A", startTime: time(9, 0), endTime: time(13, 0) },
    { id: 2, project: "B", startTime: time(9, 0), endTime: time(17, 0) },
  ];

  test("aggregates hours, percentages, and remaining targets for the selected week", () => {
    expect(summarizeWeeklyProjectAllocations(entries, projects, 40)).toEqual([
      {
        name: "A",
        hours: 4,
        percentage: 33.3,
        allocation: 50,
        progress: 66.7,
        status: "green",
        expectedHours: 20,
        remainingHours: 16,
      },
      {
        name: "B",
        hours: 8,
        percentage: 66.7,
        allocation: 40,
        progress: 100,
        status: "yellow",
        expectedHours: 16,
        remainingHours: 8,
      },
      {
        name: "C",
        hours: 0,
        percentage: 0,
        allocation: 10,
        progress: 0,
        status: "green",
        expectedHours: 4,
        remainingHours: 4,
      },
    ]);
  });
});

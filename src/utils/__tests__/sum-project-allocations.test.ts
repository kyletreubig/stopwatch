import { describe, expect, test } from "vitest";

import type { Project } from "@/db";

import { sumProjectAllocations } from "../sum-project-allocations";

describe("sumProjectAllocations", () => {
  const projects: Project[] = [
    { id: 1, name: "A", allocation: 50 },
    { id: 2, name: "B", allocation: 40 },
    { id: 3, name: "C", allocation: 10 },
  ];

  test.each([
    {
      name: "keeps a normal mixed allocation total",
      input: projects,
      expected: 100,
    },
    {
      name: "allows totals above 100 when each number is treated as a cap",
      input: [{ ...projects[0], allocation: 75 }, ...projects.slice(1)],
      expected: 125,
    },
    {
      name: "defaults nonnumeric values to zero",
      input: [{ id: 1, name: "A", allocation: Number.NaN }],
      expected: 0,
    },
  ])("$name", ({ input, expected }) => {
    expect(sumProjectAllocations(input)).toBe(expected);
  });
});

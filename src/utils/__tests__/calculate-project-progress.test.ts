import { describe, expect, test } from "vitest";

import { calculateProjectProgress } from "../calculate-project-progress";

describe("calculateProjectProgress", () => {
  test.each([
    { sharePercentage: 20, allocationPercentage: 50, expected: 40 },
    { sharePercentage: 80, allocationPercentage: 40, expected: 100 },
    { sharePercentage: 25, allocationPercentage: 0, expected: 100 },
    { sharePercentage: 0, allocationPercentage: 50, expected: 0 },
  ])(
    "returns $expected for share $sharePercentage and allocation $allocationPercentage",
    ({ sharePercentage, allocationPercentage, expected }) => {
      expect(
        calculateProjectProgress(sharePercentage, allocationPercentage),
      ).toBe(expected);
    },
  );
});

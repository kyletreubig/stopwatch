import { describe, expect, test } from "vitest";

import { getProjectAllocationStatus } from "../get-project-allocation-status";

describe("getProjectAllocationStatus", () => {
  test.each([
    {
      sharePercentage: 20,
      allocationPercentage: 50,
      complete: false,
      expected: "green",
    },
    {
      sharePercentage: 80,
      allocationPercentage: 40,
      complete: false,
      expected: "yellow",
    },
    {
      sharePercentage: 80,
      allocationPercentage: 40,
      complete: true,
      expected: "red",
    },
    {
      sharePercentage: 40,
      allocationPercentage: 30,
      complete: false,
      expected: "yellow",
    },
  ])(
    "returns $expected for share $sharePercentage and allocation $allocationPercentage when complete is $complete",
    ({ sharePercentage, allocationPercentage, complete, expected }) => {
      expect(
        getProjectAllocationStatus(
          sharePercentage,
          allocationPercentage,
          complete,
        ),
      ).toBe(expected);
    },
  );
});

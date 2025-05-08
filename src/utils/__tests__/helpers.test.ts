import { expect, test } from "vitest";

export function time(hours: number, minutes: number) {
  return new Date(2025, 5, 5, hours, minutes, 0, 0);
}

test("time equality", () => {
  expect(time(10, 30)).toEqual(time(10, 30));
});

import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { interjectWorkEntry } from "../interject-work-entry";

import { time } from "./helpers.test";

describe("interjectWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 0), project: "B" },
    { id: 3, startTime: time(13, 0), endTime: null, project: "A" },
  ];

  test("without end time", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(11, 15),
      endTime: null,
      project: "C",
    });
    expect(interjected).rejects.toEqual(
      "Entry to insert must have an end time.",
    );
  });

  test("with invalid end time", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(11, 45),
      endTime: time(11, 15),
      project: "C",
    });
    expect(interjected).rejects.toEqual("End time must be after start time.");
  });

  test("before target", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(8, 0),
      endTime: time(9, 0),
      project: "C",
    });
    expect(interjected).rejects.toEqual(
      "Cannot insert entry before target entry.",
    );
  });

  test("at target start", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(11, 0),
      endTime: time(11, 15),
      project: "C",
    });
    expect(interjected).rejects.toEqual(
      "Cannot insert entry before target entry.",
    );
  });

  test("after target", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(13, 30),
      endTime: time(14, 0),
      project: "C",
    });
    expect(interjected).rejects.toEqual(
      "Cannot insert entry after target entry.",
    );
  });

  test("at target end", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(12, 30),
      endTime: time(13, 0),
      project: "C",
    });
    expect(interjected).rejects.toEqual(
      "Cannot insert entry after target entry.",
    );
  });

  test("into middle of entry", () => {
    const interjected = interjectWorkEntry(entries[1], {
      startTime: time(12, 0),
      endTime: time(12, 30),
      project: "C",
    });
    expect(interjected).resolves.toEqual([
      { id: 2, updates: { endTime: time(12, 0) } },
      {
        id: 0,
        values: { startTime: time(12, 0), endTime: time(12, 30), project: "C" },
      },
      {
        id: 0,
        values: { startTime: time(12, 30), endTime: time(13, 0), project: "B" },
      },
    ]);
  });

  test("into active timer", () => {
    const interjected = interjectWorkEntry(entries[2], {
      startTime: time(14, 0),
      endTime: time(15, 0),
      project: "C",
    });
    expect(interjected).resolves.toEqual([
      { id: 3, updates: { endTime: time(14, 0) } },
      {
        id: 0,
        values: { startTime: time(14, 0), endTime: time(15, 0), project: "C" },
      },
      {
        id: 0,
        values: { startTime: time(15, 0), endTime: null, project: "A" },
      },
    ]);
  });
});

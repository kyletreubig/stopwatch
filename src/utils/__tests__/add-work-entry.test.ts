import { describe, expect, test } from "vitest";

import { WorkEntry } from "@/db";

import { addWorkEntry } from "../work-entry-actions";

import { time } from "./helpers.test";

describe("addWorkEntry", () => {
  const entries: WorkEntry[] = [
    { id: 1, startTime: time(10, 0), endTime: time(11, 0), project: "A" },
    { id: 2, startTime: time(11, 0), endTime: time(13, 0), project: "B" },
  ];

  test("before first", () => {
    const entry = {
      startTime: time(9, 0),
      endTime: time(10, 0),
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).resolves.toEqual([
      {
        id: 0,
        values: {
          startTime: time(9, 0),
          endTime: time(10, 0),
          project: "C",
        },
      },
    ]);
  });

  test("active before first", () => {
    const entry = {
      startTime: time(9, 0),
      endTime: null,
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).rejects.toEqual(
      "A timer entry must start at the end of the last work entry.",
    );
  });

  test("too early before first", () => {
    const entry = {
      startTime: time(9, 0),
      endTime: time(9, 30),
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).rejects.toEqual(
      "New first entry must end at the start of the current first work entry.",
    );
  });

  test("in middle", () => {
    const entry = {
      startTime: time(12, 0),
      endTime: time(12, 30),
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).rejects.toEqual(
      "New last entry must start at the end of the current last work entry.",
    );
  });

  test("after last", () => {
    const entry = {
      startTime: time(13, 0),
      endTime: time(14, 0),
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).resolves.toEqual([
      {
        id: 0,
        values: {
          startTime: time(13, 0),
          endTime: time(14, 0),
          project: "C",
        },
      },
    ]);
  });

  test("active after last", () => {
    const entry = {
      startTime: time(13, 0),
      endTime: null,
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).resolves.toEqual([
      {
        id: 0,
        values: {
          startTime: time(13, 0),
          endTime: null,
          project: "C",
        },
      },
    ]);
  });

  test("too late after last", () => {
    const entry = {
      startTime: time(13, 30),
      endTime: time(14, 0),
      project: "C",
    };
    const added = addWorkEntry(entry, entries);
    expect(added).rejects.toEqual(
      "New last entry must start at the end of the current last work entry.",
    );
  });

  test("before active", () => {
    const entry = {
      startTime: time(9, 0),
      endTime: time(10, 0),
      project: "C",
    };
    const peers = [
      { id: 3, startTime: time(10, 0), endTime: null, project: "A" },
    ];
    const added = addWorkEntry(entry, peers);
    expect(added).resolves.toEqual([
      {
        id: 0,
        values: {
          startTime: time(9, 0),
          endTime: time(10, 0),
          project: "C",
        },
      },
    ]);
  });

  test("after active", () => {
    const entry = {
      startTime: time(13, 30),
      endTime: time(14, 0),
      project: "C",
    };
    const peers = [
      { id: 3, startTime: time(13, 0), endTime: null, project: "A" },
    ];
    const added = addWorkEntry(entry, peers);
    expect(added).rejects.toEqual(
      "New last entry cannot be added while a timer is active.",
    );
  });
});

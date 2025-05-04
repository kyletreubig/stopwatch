import { isEqual } from "date-fns";

import { WorkEntry } from "@/db";

export function validateWorkEntry(
  startTime: Date,
  endTime: Date | null,
  entries?: WorkEntry[],
): string | null {
  const firstEntry = entries?.at(0);
  const lastEntry = entries?.at(-1);

  if (endTime == null) {
    if (lastEntry?.endTime && !isEqual(lastEntry.endTime, startTime)) {
      return "A timer entry must start at the end of the last work entry.";
    }
  } else {
    if (endTime <= startTime) {
      return "End time must be after start time.";
    }
    if (firstEntry && startTime < firstEntry.startTime) {
      if (!isEqual(endTime, firstEntry.startTime)) {
        return "New first entry must end at the start of the current first work entry.";
      }
      return null; // Entry is being properly prepended to entries list
    }
    if (lastEntry) {
      if (lastEntry.endTime == null) {
        return "New last entry cannot be added while a timer is active.";
      }
      if (!isEqual(lastEntry.endTime, startTime)) {
        return "New last entry must start at the end of the current last work entry.";
      }
    }
  }

  return null;
}

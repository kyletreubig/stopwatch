import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function completeWorkEntry(
  entry: WorkEntry,
  endTime: Date,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    if (entry.endTime != null) {
      reject("Cannot complete entry that is not an active timer.");
    } else if (endTime <= entry.startTime) {
      reject("End time must be after start time.");
    } else {
      resolve([{ id: entry.id, updates: { endTime } }]);
    }
  });
}

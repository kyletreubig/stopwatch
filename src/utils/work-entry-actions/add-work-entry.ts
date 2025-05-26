import { isEqual } from "date-fns";

import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function addWorkEntry(
  entry: Omit<WorkEntry, "id">,
  peers: WorkEntry[],
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    const firstEntry = peers.at(0);
    const lastEntry = peers.at(-1);

    if (entry.endTime == null) {
      // If the entry is a timer, it must start at the end of the last entry
      if (lastEntry?.endTime && !isEqual(lastEntry.endTime, entry.startTime)) {
        reject("A timer entry must start at the end of the last work entry.");
        return;
      }
    } else {
      if (entry.endTime <= entry.startTime) {
        reject("End time must be after start time.");
        return;
      }
      if (firstEntry && entry.startTime < firstEntry.startTime) {
        if (!isEqual(entry.endTime, firstEntry.startTime)) {
          reject(
            "New first entry must end at the start of the current first work entry.",
          );
          return;
        }
      } else if (lastEntry) {
        if (lastEntry.endTime == null) {
          reject("New last entry cannot be added while a timer is active.");
          return;
        }
        if (!isEqual(lastEntry.endTime, entry.startTime)) {
          reject(
            "New last entry must start at the end of the current last work entry.",
          );
          return;
        }
      }
    }

    resolve([
      {
        id: 0,
        values: entry,
      },
    ]);
  });
}

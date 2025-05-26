import { isEqual } from "date-fns";

import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function mergeWorkEntry(
  entryToMerge: WorkEntry,
  peers: WorkEntry[],
  into: "prior" | "next",
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    const changes: WorkEntryChange[] = [];
    for (const peer of peers) {
      if (
        into == "prior" &&
        peer.endTime &&
        isEqual(peer.endTime, entryToMerge.startTime)
      ) {
        changes.push({
          id: peer.id,
          updates: {
            endTime: entryToMerge.endTime,
          },
        });
      } else if (
        into == "next" &&
        entryToMerge.endTime &&
        isEqual(peer.startTime, entryToMerge.endTime)
      ) {
        changes.push({
          id: peer.id,
          updates: {
            startTime: entryToMerge.startTime,
          },
        });
      }
    }
    if (changes.length === 0) {
      reject("Unable to merge entry.");
    }

    changes.push({
      id: entryToMerge.id,
      delete: true,
    });
    resolve(changes);
  });
}

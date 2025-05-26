import { addMilliseconds, isEqual } from "date-fns";

import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function resizeWorkEntry(
  entry: WorkEntry,
  peers: WorkEntry[],
  resizeAmountMs: number,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    if (entry.endTime == null) {
      reject("Cannot resize an active timer entry.");
      return;
    }

    const newEndTime = addMilliseconds(entry.endTime, resizeAmountMs);
    if (newEndTime <= entry.startTime) {
      reject("Cannot resize entry to end before it starts.");
      return;
    }

    const changes: WorkEntryChange[] = [];
    for (const peer of peers) {
      // Entry being resized
      if (peer.id == entry.id) {
        changes.push({
          id: peer.id,
          updates: { endTime: newEndTime },
        });
      }
      // Peer immediately after resizing entry needs to adjust its startTime
      else if (isEqual(peer.startTime, entry.endTime)) {
        if (peer.endTime && peer.endTime <= newEndTime) {
          reject("Cannot resize entry to end after next entry.");
          return;
        }
        changes.push({
          id: peer.id,
          updates: { startTime: newEndTime },
        });
      }
    }
    resolve(changes);
  });
}

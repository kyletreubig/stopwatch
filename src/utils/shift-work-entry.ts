import { addMilliseconds, isEqual } from "date-fns";

import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function shiftEntries(
  entries: WorkEntry[],
  shiftAmountMs: number,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve) =>
    resolve(
      entries.map((entry) => {
        const startTime = addMilliseconds(entry.startTime, shiftAmountMs);
        const endTime = entry.endTime
          ? addMilliseconds(entry.endTime, shiftAmountMs)
          : null;
        return {
          id: entry.id,
          updates: {
            startTime,
            endTime,
          },
        };
      }),
    ),
  );
}

export function shiftEntry(
  entry: WorkEntry,
  peers: WorkEntry[],
  shiftAmountMs: number,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    const newStartTime = addMilliseconds(entry.startTime, shiftAmountMs);
    const newEndTime = entry.endTime
      ? addMilliseconds(entry.endTime, shiftAmountMs)
      : null;
    const changes: WorkEntryChange[] = [];
    for (const peer of peers) {
      // Peer immediately before shifting entry needs to adjust its endTime
      if (peer.endTime && isEqual(peer.endTime, entry.startTime)) {
        if (peer.startTime >= newStartTime) {
          reject("Cannot shift entry to start before prior entry.");
          return;
        }
        changes.push({
          id: peer.id,
          updates: { endTime: newStartTime },
        });
      }
      // Entry being shifted
      else if (peer.id == entry.id) {
        changes.push({
          id: peer.id,
          updates: {
            startTime: newStartTime,
            endTime: newEndTime,
          },
        });
      }
      // Peer immediately after shifting entry needs to adjust its startTime
      else if (
        newEndTime &&
        entry.endTime &&
        isEqual(peer.startTime, entry.endTime)
      ) {
        if (peer.endTime && peer.endTime <= newEndTime) {
          reject("Cannot shift entry to end after next entry.");
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

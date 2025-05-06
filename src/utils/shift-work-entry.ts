import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function shiftEntries(
  entries: WorkEntry[],
  shiftAmountMs: number,
): WorkEntryChange[] {
  return entries.map((entry) => {
    const startTime = new Date(entry.startTime.getTime() + shiftAmountMs);
    const endTime = entry.endTime
      ? new Date(entry.endTime.getTime() + shiftAmountMs)
      : null;
    return {
      id: entry.id,
      updates: {
        startTime,
        endTime,
      },
    };
  });
}

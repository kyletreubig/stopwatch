import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function splitWorkEntry(
  entryToSplit: WorkEntry,
  splitAt: Date,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    const splitStart = entryToSplit.startTime.getTime();
    const splitEnd = entryToSplit.endTime?.getTime();
    const splitTimeMs = splitAt.getTime();

    if (splitEnd && splitTimeMs >= splitEnd) {
      reject("Cannot split entry after its end time.");
    } else if (splitTimeMs <= splitStart) {
      reject("Cannot split entry before its start time.");
    } else {
      const { id, ...split } = entryToSplit;
      resolve([
        {
          id,
          updates: { endTime: splitAt },
        },
        {
          id: 0,
          values: {
            ...split,
            startTime: splitAt,
          },
        },
      ]);
    }
  });
}

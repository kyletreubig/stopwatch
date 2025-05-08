import { WorkEntry } from "@/db";
import { WorkEntryChange } from "@/types";

export function interjectWorkEntry(
  entryToSplit: WorkEntry,
  entryToInterject: Omit<WorkEntry, "id">,
): Promise<WorkEntryChange[]> {
  return new Promise((resolve, reject) => {
    const splitStart = entryToSplit.startTime.getTime();
    const splitEnd = entryToSplit.endTime?.getTime();
    const insertStart = entryToInterject.startTime.getTime();
    const insertEnd = entryToInterject.endTime?.getTime();

    if (!entryToInterject.endTime || insertEnd == undefined) {
      reject("Entry to insert must have an end time.");
    } else if (insertEnd <= insertStart) {
      reject("End time must be after start time.");
    } else if (insertStart <= splitStart) {
      reject("Cannot insert entry before target entry.");
    } else if (splitEnd && insertEnd >= splitEnd) {
      reject("Cannot insert entry after target entry.");
    } else {
      const { id, ...split } = entryToSplit;
      resolve([
        {
          id,
          updates: { endTime: entryToInterject.startTime },
        },
        {
          id: 0,
          values: entryToInterject,
        },
        {
          id: 0,
          values: {
            ...split,
            startTime: entryToInterject.endTime,
          },
        },
      ]);
    }
  });
}

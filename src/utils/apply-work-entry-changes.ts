import { addWorkEntry } from "@/api/add-work-entry";
import { deleteWorkEntry } from "@/api/delete-work-entry";
import { updateWorkEntry } from "@/api/update-work-entry";
import { db } from "@/db";
import { WorkEntryChange } from "@/types";

export function applyWorkEntryChanges(changes: WorkEntryChange[]) {
  db.transaction("rw", db.workEntries, () => {
    for (const change of changes) {
      if (change.values) {
        addWorkEntry(change.values);
      } else if (change.updates) {
        updateWorkEntry(change.id, change.updates);
      } else if (change.delete) {
        deleteWorkEntry(change.id);
      }
    }
  });
}

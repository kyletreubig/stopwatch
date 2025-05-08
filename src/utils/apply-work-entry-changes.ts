import { db } from "@/db";
import { WorkEntryChange } from "@/types";

export function applyWorkEntryChanges(changes: WorkEntryChange[]) {
  db.transaction("rw", db.workEntries, () => {
    for (const change of changes) {
      if (change.updates) {
        db.workEntries.update(change.id, change.updates);
      } else if (change.delete) {
        db.workEntries.delete(change.id);
      }
    }
  });
}

import { db, type WorkEntry } from "@/db";

export async function updateWorkEntry(
  id: number,
  changes: Partial<Omit<WorkEntry, "id">>,
) {
  return db.workEntries.update(id, changes);
}

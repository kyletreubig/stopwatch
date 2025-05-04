import { db, type WorkEntry } from "@/db";

export async function addWorkEntry(entry: Omit<WorkEntry, "id">) {
  return db.workEntries.add(entry);
}

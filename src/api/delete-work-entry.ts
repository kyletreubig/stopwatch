import { db } from "@/db";

export async function deleteWorkEntry(id: number) {
  return db.workEntries.delete(id);
}

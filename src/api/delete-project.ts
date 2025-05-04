import { db } from "@/db";

export async function deleteProject(id: number) {
  return db.projects.delete(id);
}

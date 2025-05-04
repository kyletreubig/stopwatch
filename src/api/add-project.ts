import { db } from "@/db";

export async function addProject(name: string) {
  return db.projects.add({ name });
}

import { db } from "@/db";

export async function updateProjectAllocation(id: number, allocation: number) {
  const safeAllocation = Number.isFinite(allocation) ? allocation : 0;
  return db.projects.update(id, {
    allocation: Math.max(0, Math.min(100, safeAllocation)),
  });
}

export async function resetProjectAllocations() {
  const projects = await db.projects.toArray();
  return Promise.all(
    projects.map((project) =>
      db.projects.update(project.id, { allocation: 0 }),
    ),
  );
}

import type { Project } from "@/db";

export function sumProjectAllocations(
  projects: Pick<Project, "allocation">[],
): number {
  return projects.reduce((sum, project) => {
    const allocation = Number.isFinite(project.allocation)
      ? project.allocation
      : 0;
    return sum + allocation;
  }, 0);
}

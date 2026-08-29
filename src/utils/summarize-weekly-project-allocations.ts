import type { Project, WorkEntry } from "@/db";

import { calcDuration } from "./calc-duration";
import { calculateProjectProgress } from "./calculate-project-progress";
import { getProjectAllocationStatus } from "./get-project-allocation-status";

type WeeklyProjectSummary = {
  name: string;
  hours: number;
  percentage: number;
  allocation: number;
  progress: number;
  status: "green" | "yellow" | "red";
  expectedHours: number;
  remainingHours: number;
};

export function summarizeWeeklyProjectAllocations(
  entries: WorkEntry[],
  projects: Pick<Project, "name" | "allocation">[],
  completeHours: number,
): WeeklyProjectSummary[] {
  const totalsByProject = new Map<string, number>();

  for (const entry of entries) {
    const hours = entry.endTime
      ? calcDuration(entry.startTime, entry.endTime)
      : 0;
    const current = totalsByProject.get(entry.project) ?? 0;
    totalsByProject.set(entry.project, current + hours);
  }

  const totalHours = Array.from(totalsByProject.values()).reduce(
    (sum, hours) => sum + hours,
    0,
  );

  const complete = totalHours >= completeHours;

  return projects
    .map((project) => {
      const hours = totalsByProject.get(project.name) ?? 0;
      const percentage = totalHours > 0 ? (hours / totalHours) * 100 : 0;
      const allocation = Number.isFinite(project.allocation)
        ? project.allocation
        : 0;
      const progress = calculateProjectProgress(percentage, allocation);
      const expectedHours = (allocation / 100) * completeHours;
      const remainingHours = Math.max(expectedHours - hours, 0);

      return {
        name: project.name,
        hours: Number(hours.toFixed(1)),
        percentage: Number(percentage.toFixed(1)),
        allocation,
        progress: Number(progress.toFixed(1)),
        status: getProjectAllocationStatus(percentage, allocation, complete),
        expectedHours: Number(expectedHours.toFixed(1)),
        remainingHours: Number(remainingHours.toFixed(1)),
      };
    })
    .filter((row) => row.hours > 0 || row.allocation > 0)
    .sort((left, right) => left.name.localeCompare(right.name));
}

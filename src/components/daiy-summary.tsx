import { useMemo } from "react";

import { useWorkEntries } from "@/api/get-work-entries";
import { WorkEntry } from "@/db";
import { useDateSelectionStore } from "@/stores/date-selection";
import { calcDuration } from "@/utils/calc-duration";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function summarize(entries?: WorkEntry[]) {
  const byProject = new Map<string, number>();
  let total = 0;
  entries?.forEach((entry) => {
    if (entry.endTime) {
      const duration = calcDuration(entry.startTime, entry.endTime);
      const prev = byProject.get(entry.project) || 0;
      byProject.set(entry.project, prev + duration);
      total += duration;
    }
  });
  return { byProject, total };
}

export function DailySummary() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  const workEntries = useWorkEntries(selectedDate);
  const { byProject, total } = useMemo(
    () => summarize(workEntries),
    [workEntries],
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...byProject.keys()].sort().map((project) => (
          <TableRow key={project}>
            <TableCell>{project}</TableCell>
            <TableCell>{(byProject.get(project) || 0).toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{total.toFixed(1)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

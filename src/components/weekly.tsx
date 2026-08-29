import { addDays, format, subWeeks } from "date-fns";
import { useMemo } from "react";

import { useProjects } from "@/api/get-projects";
import { useWorkEntries } from "@/api/get-work-entries";
import { useDateSelectionStore } from "@/stores/date-selection";
import { useWeeklyViewStore } from "@/stores/weekly-view";
import { datesOfWeek } from "@/utils/dates-of-week";
import { summarizeWeeklyProjectAllocations } from "@/utils/summarize-weekly-project-allocations";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

const BAR_COLORS = {
  green: "#22c55e",
  yellow: "#f59e0b",
  red: "#ef4444",
};

export function Weekly() {
  const projects = useProjects();
  const selectedDate = useDateSelectionStore.use.selectedDate();
  const weeksToDisplay = useWeeklyViewStore.use.weeksToDisplay();
  const setWeeksToDisplay = useWeeklyViewStore.use.setWeeksToDisplay();

  const range = useMemo(() => {
    const currentWeekStart = datesOfWeek(selectedDate)[0];
    const start = subWeeks(currentWeekStart, weeksToDisplay - 1);
    return {
      start,
      end: addDays(currentWeekStart, 6),
    };
  }, [selectedDate, weeksToDisplay]);

  const workEntries = useWorkEntries(range.start, addDays(range.end, 1));

  const completeHours = weeksToDisplay * 40;
  const summary = summarizeWeeklyProjectAllocations(
    workEntries ?? [],
    projects ?? [],
    completeHours,
  );
  const totalHours = summary.reduce((sum, row) => sum + row.hours, 0);
  const totalPercentage = Math.min((totalHours / completeHours) * 100, 100);
  const rangeLabel = `${format(range.start, "MMM d")} - ${format(range.end, "MMM d")}`;

  return (
    <div className="p-4 flex flex-col gap-2 border rounded shadow">
      <h2 className="flex justify-between">
        <span>{rangeLabel}</span>
        <div className="flex items-center justify-end gap-2">
          <Input
            className="w-20"
            id="weeks-to-display"
            max={12}
            min={1}
            onChange={(event) => {
              const parsed = Number(event.target.value);
              setWeeksToDisplay(
                Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 12) : 1,
              );
            }}
            type="number"
            value={weeksToDisplay}
          />
          <Label className="text-nowrap" htmlFor="weeks-to-display">
            Weeks
          </Label>
        </div>
      </h2>

      {summary.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          No work entries recorded for the selected range.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {summary.map((row) => (
            <div key={row.name} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span>{row.name}</span>
                <span>
                  {row.hours.toFixed(1)}h ({row.percentage.toFixed(1)}% vs{" "}
                  {row.allocation}%)
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.progress}%`,
                    backgroundColor: BAR_COLORS[row.status],
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {row.allocation}% of {completeHours}h would be{" "}
                {row.expectedHours.toFixed(1)}h
                {row.remainingHours > 0 && (
                  <>
                    <br />
                    {row.remainingHours.toFixed(1)}h remaining
                  </>
                )}
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span>Total</span>
              <span>
                {totalHours.toFixed(1)}h ({totalPercentage.toFixed(1)}% of{" "}
                {completeHours}h)
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${totalPercentage}%`,
                  backgroundColor: BAR_COLORS.green,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

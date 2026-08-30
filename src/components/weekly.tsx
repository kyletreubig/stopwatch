import { addDays, format, subWeeks } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { useMemo } from "react";

import { useProjects } from "@/api/get-projects";
import { useWorkEntries } from "@/api/get-work-entries";
import { useDateSelectionStore } from "@/stores/date-selection";
import { useWeeklyViewStore } from "@/stores/weekly-view";
import { datesOfWeek } from "@/utils/dates-of-week";
import { summarizeWeeklyProjectAllocations } from "@/utils/summarize-weekly-project-allocations";

import { Button } from "./ui/button";
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
    <div className="flex flex-col gap-3 rounded-xl border p-3 shadow sm:gap-2 sm:p-4">
      <h2 className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-2xl font-semibold sm:text-base sm:font-medium">
          {rangeLabel}
        </span>
        <div className="flex items-center justify-start gap-2 sm:justify-end">
          <Button
            className="h-11 w-11 sm:h-9 sm:w-9"
            onClick={() => setWeeksToDisplay(Math.max(weeksToDisplay - 1, 1))}
            size="icon"
            type="button"
            variant="outline"
          >
            <Minus />
          </Button>
          <Input
            className="h-11 w-16 text-center sm:h-9 sm:w-20"
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
          <Button
            className="h-11 w-11 sm:h-9 sm:w-9"
            onClick={() => setWeeksToDisplay(Math.min(weeksToDisplay + 1, 12))}
            size="icon"
            type="button"
            variant="outline"
          >
            <Plus />
          </Button>
          <Label
            className="text-sm text-muted-foreground"
            htmlFor="weeks-to-display"
          >
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

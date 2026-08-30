import { addDays, isEqual, subDays } from "date-fns";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useMemo } from "react";

import { useDateSelectionStore } from "@/stores/date-selection";
import { datesOfWeek } from "@/utils/dates-of-week";
import { formatDate } from "@/utils/format-date";
import { getWeekdayName } from "@/utils/get-weekday-name";
import { parseDate } from "@/utils/parse-date";

import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function DateSelection() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  const setSelectedDate = useDateSelectionStore.use.setSelectedDate();
  const isMobilePanelCollapsed =
    useDateSelectionStore.use.isMobilePanelCollapsed();
  const setMobilePanelCollapsed =
    useDateSelectionStore.use.setMobilePanelCollapsed();

  const week = useMemo(() => datesOfWeek(selectedDate), [selectedDate]);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border p-3 shadow sm:gap-4 sm:p-2">
      <Collapsible
        className="w-full sm:hidden"
        onOpenChange={(open) => setMobilePanelCollapsed(!open)}
        open={!isMobilePanelCollapsed}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-muted-foreground">
              Date
            </span>
            <span className="text-sm font-medium">
              {formatDate(selectedDate, { long: true })}
            </span>
          </div>
          <CollapsibleTrigger asChild>
            <Button
              aria-label="Toggle date selection panel"
              aria-expanded={!isMobilePanelCollapsed}
              className="h-10 w-10"
              size="icon"
              type="button"
              variant="outline"
            >
              {isMobilePanelCollapsed ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1 mt-3 overflow-hidden duration-200">
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              className="h-11 w-11"
              onClick={() => setSelectedDate(subDays(selectedDate, 7))}
              size="icon"
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <Button
              className="h-11 w-11"
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              size="icon"
              variant="outline"
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="mt-3 grid w-full grid-cols-7 gap-1">
            {week.map((date) => (
              <Button
                className="h-11 min-w-10 rounded-lg"
                key={date.toString()}
                onClick={() => setSelectedDate(date)}
                variant={isEqual(date, selectedDate) ? "default" : "outline"}
              >
                {getWeekdayName(date).at(0)}
              </Button>
            ))}
          </div>
          <div className="mt-3 flex w-full flex-col gap-2">
            <Label
              className="text-nowrap text-xs text-muted-foreground"
              htmlFor="date"
            >
              Go to
            </Label>
            <Input
              className="w-full"
              id="date"
              onChange={(e) =>
                e.target.value && setSelectedDate(parseDate(e.target.value))
              }
              type="date"
              value={formatDate(selectedDate)}
            />
            <Button
              className="h-11 w-full"
              onClick={() => setSelectedDate(new Date())}
              variant="outline"
            >
              Today
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="hidden w-full flex-col gap-4 sm:flex">
        <div className="flex w-full items-center justify-center gap-1 sm:flex-nowrap">
          <Button
            className="h-9 w-9"
            onClick={() => setSelectedDate(subDays(selectedDate, 7))}
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          {week.map((date) => (
            <Button
              className="h-9 min-w-9"
              key={date.toString()}
              onClick={() => setSelectedDate(date)}
              variant={isEqual(date, selectedDate) ? "default" : "outline"}
            >
              {getWeekdayName(date).at(0)}
            </Button>
          ))}
          <Button
            className="h-9 w-9"
            onClick={() => setSelectedDate(addDays(selectedDate, 7))}
            size="icon"
            variant="outline"
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="flex w-full items-center gap-4">
          <Label
            className="text-nowrap text-sm text-muted-foreground"
            htmlFor="date"
          >
            Go to
          </Label>
          <Input
            className="w-full"
            id="date"
            onChange={(e) =>
              e.target.value && setSelectedDate(parseDate(e.target.value))
            }
            type="date"
            value={formatDate(selectedDate)}
          />
          <Button
            className="h-9 w-auto"
            onClick={() => setSelectedDate(new Date())}
            variant="outline"
          >
            Today
          </Button>
        </div>
      </div>
    </div>
  );
}

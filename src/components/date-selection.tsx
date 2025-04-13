import { addDays, isEqual, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { useDateSelectionStore } from "@/stores/date-selection";
import { datesOfWeek } from "@/utils/dates-of-week";
import { formatDate } from "@/utils/format-date";
import { getWeekdayName } from "@/utils/get-weekday-name";
import { parseDate } from "@/utils/parse-date";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function DateSelection() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  const setSelectedDate = useDateSelectionStore.use.setSelectedDate();

  const week = useMemo(() => datesOfWeek(selectedDate), [selectedDate]);

  return (
    <div className="flex flex-col gap-4 items-center border p-2 rounded shadow">
      <div className="flex gap-1">
        <Button
          onClick={() => setSelectedDate(subDays(selectedDate, 7))}
          size="icon"
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        {week.map((date) => (
          <Button
            key={date.toString()}
            onClick={() => setSelectedDate(date)}
            variant={isEqual(date, selectedDate) ? "default" : "outline"}
          >
            {getWeekdayName(date).at(0)}
          </Button>
        ))}
        <Button
          onClick={() => setSelectedDate(addDays(selectedDate, 7))}
          size="icon"
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Label className="text-nowrap" htmlFor="date">
          Go to
        </Label>
        <Input
          id="date"
          onChange={(e) =>
            e.target.value && setSelectedDate(parseDate(e.target.value))
          }
          type="date"
          value={formatDate(selectedDate)}
        />
        <Button onClick={() => setSelectedDate(new Date())} variant="outline">
          Today
        </Button>
      </div>
      <div>{formatDate(selectedDate, { long: true })}</div>
    </div>
  );
}

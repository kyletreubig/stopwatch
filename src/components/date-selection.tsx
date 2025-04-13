import { isEqual } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useDates } from "@/hooks/use-dates";
import { formatDate } from "@/utils/format-date";
import { getWeekdayName } from "@/utils/get-weekday-name";

import { Button } from "./ui/button";

export function DateSelection() {
  const { currentDate, datesOfWeek } = useDates();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-1">
        <Button size="icon" variant="outline">
          <ChevronLeft />
        </Button>
        {datesOfWeek.map((date) => (
          <Button
            key={date.toString()}
            variant={isEqual(date, currentDate) ? "default" : "outline"}
          >
            {getWeekdayName(date).at(0)}
          </Button>
        ))}
        <Button size="icon" variant="outline">
          <ChevronRight />
        </Button>
      </div>
      <div>{formatDate(currentDate, { long: true })}</div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-sm font-medium">
          Select a date:
        </label>
        <input
          type="date"
          id="date"
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
}

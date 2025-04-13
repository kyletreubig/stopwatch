import { isEqual } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useDates } from "@/hooks/use-dates";
import { formatDate } from "@/utils/format-date";
import { getWeekdayName } from "@/utils/get-weekday-name";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function DateSelection() {
  const { currentDate, datesOfWeek } = useDates();

  return (
    <div className="flex flex-col gap-4 items-center border p-2 rounded shadow">
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
      <div className="flex gap-4 items-center">
        <Label className="text-nowrap" htmlFor="date2">
          Go to
        </Label>
        <Input type="date" id="date2" />
        <Button variant="outline">Today</Button>
      </div>
      <div>{formatDate(currentDate, { long: true })}</div>
    </div>
  );
}

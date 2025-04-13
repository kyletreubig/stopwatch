import { addDays, eachDayOfInterval, subDays } from "date-fns";

export function datesOfWeek(date: Date) {
  const dayOfWeek = date.getDay();
  const startOfWeek = subDays(date, dayOfWeek);
  return eachDayOfInterval({
    start: startOfWeek,
    end: addDays(startOfWeek, 6),
  });
}

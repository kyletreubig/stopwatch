import { addDays, eachDayOfInterval } from "date-fns";

export function useDates() {
  // Get the current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight
  // Get the current day of the week
  const currentDayOfWeek = currentDate.getDay();
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
  // Get the dates of the week (Sunday to Saturday)
  const datesOfWeek = eachDayOfInterval({
    start: startOfWeek,
    end: addDays(startOfWeek, 6),
  });
  return {
    currentDate,
    datesOfWeek,
  };
}

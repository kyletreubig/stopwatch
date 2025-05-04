export function parseTime(refDate: Date, timeAsStr: string): Date {
  const date = new Date(refDate);
  const [hours, minutes] = timeAsStr.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

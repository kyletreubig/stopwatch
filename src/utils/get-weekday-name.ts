export function getWeekdayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

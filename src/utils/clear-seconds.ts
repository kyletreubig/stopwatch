export function clearSeconds(date: Date) {
  date.setHours(date.getHours(), date.getMinutes(), 0, 0);
  return date;
}

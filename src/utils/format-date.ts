import { format } from "date-fns";

export function formatDate(
  date: Date,
  { long = false }: { long?: boolean } = {},
): string {
  if (long) return date.toDateString();
  return format(date, "yyyy-MM-dd");
}

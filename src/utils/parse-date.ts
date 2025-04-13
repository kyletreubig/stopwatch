import { parse } from "date-fns";

export function parseDate(dateAsStr: string): Date {
  return parse(dateAsStr, "yyyy-MM-dd", new Date());
}

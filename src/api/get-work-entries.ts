import { addDays } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

import { db } from "@/db";
import { clearTime } from "@/utils/clear-time";

export function useWorkEntries(fromDate: Date, toDate?: Date) {
  const [lower, upper] = useMemo(() => {
    // Midnight of the given date
    const lower = clearTime(new Date(fromDate));
    // Midnight of the next day
    const upper = toDate ? clearTime(new Date(toDate)) : addDays(lower, 1);
    return [lower, upper];
  }, [fromDate, toDate]);

  return useLiveQuery(
    () =>
      db.workEntries
        .where("startTime")
        .between(lower, upper)
        .sortBy("startTime"),
    [lower, upper],
  );
}

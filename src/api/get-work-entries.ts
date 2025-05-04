import { addDays } from "date-fns";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

import { db } from "@/db";
import { clearTime } from "@/utils/clear-time";

export function useWorkEntries(date: Date) {
  const [lower, upper] = useMemo(() => {
    // Midnight of the given date
    const lower = clearTime(new Date(date));
    // Midnight of the next day
    const upper = addDays(lower, 1);
    return [lower, upper];
  }, [date]);

  return useLiveQuery(
    () =>
      db.workEntries
        .where("startTime")
        .between(lower, upper)
        .sortBy("startTime"),
    [lower, upper],
  );
}

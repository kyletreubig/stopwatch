import { useDateSelectionStore } from "@/stores/date-selection";
import { formatDate } from "@/utils/format-date";

import { ActiveWorkEntry } from "./active-work-entry";
import { WorkEntry } from "./work-entry";

export function DailyInput() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  return (
    <div className="p-4 flex flex-col gap-2 border rounded shadow">
      <h2>{formatDate(selectedDate, { long: true })}</h2>
      <WorkEntry />
      <WorkEntry />
      <ActiveWorkEntry />
    </div>
  );
}

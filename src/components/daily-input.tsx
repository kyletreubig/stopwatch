import { useWorkEntries } from "@/api/get-work-entries";
import { useDateSelectionStore } from "@/stores/date-selection";

import { AddWorkEntry } from "./add-work-entry";
import { WorkEntry } from "./work-entry";

export function DailyInput() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  const workEntries = useWorkEntries(selectedDate);
  return (
    <div className="flex flex-col gap-2">
      {workEntries?.map((entry) => <WorkEntry key={entry.id} entry={entry} />)}
      <AddWorkEntry date={selectedDate} />
    </div>
  );
}

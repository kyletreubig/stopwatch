import { type WorkEntry as WorkEntryType } from "@/db";
import { calcDuration } from "@/utils/calc-duration";
import { formatTime } from "@/utils/format-time";

import { ProjectSelect } from "./project-select";
import { Input } from "./ui/input";
import { WorkEntryActions } from "./work-entry-actions";

export function WorkEntry({ entry }: { entry: WorkEntryType }) {
  const duration = entry.endTime
    ? calcDuration(entry.startTime, entry.endTime)
    : 0;
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-2 items-center">
      <Input disabled type="time" value={formatTime(entry.startTime)} />
      to
      <Input
        disabled
        type="time"
        value={entry.endTime ? formatTime(entry.endTime) : ""}
      />
      <Input disabled value={duration} />
      <ProjectSelect value={entry.project} />
      <WorkEntryActions />
    </div>
  );
}

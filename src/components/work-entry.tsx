import { useEffect, useState } from "react";

import { updateWorkEntry } from "@/api/update-work-entry";
import { type WorkEntry as WorkEntryType } from "@/db";
import { cn } from "@/lib/utils";
import { calcDuration } from "@/utils/calc-duration";
import { formatTime } from "@/utils/format-time";

import { ActiveWorkEntryActions } from "./active-work-entry-actions";
import { ProjectSelect } from "./project-select";
import { Input } from "./ui/input";
import { WorkEntryActions } from "./work-entry-actions";

export function WorkEntry({
  entry,
  entries,
}: {
  entry: WorkEntryType;
  entries?: WorkEntryType[];
}) {
  const isActive = entry.endTime == null;
  const [endTime, setEndTime] = useState(entry.endTime);
  const [duration, setDuration] = useState(() =>
    entry.endTime ? calcDuration(entry.startTime, entry.endTime) : 0,
  );

  useEffect(() => {
    if (entry.endTime == null) {
      const updateEndTime = () => {
        const date = new Date();
        setEndTime(date);
        setDuration(calcDuration(entry.startTime, date));
      };
      updateEndTime();
      const reg = setInterval(updateEndTime, 1000 * 60); // Every minute
      return () => clearInterval(reg);
    } else {
      setEndTime(entry.endTime);
      setDuration(calcDuration(entry.startTime, entry.endTime));
    }
  }, [entry]);

  const handleProjectChange = (project: string) =>
    updateWorkEntry(entry.id, { project });

  return (
    <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-2 items-center">
      <Input
        className={cn({ "border-green-600 bg-green-50": isActive })}
        disabled
        type="time"
        value={formatTime(entry.startTime)}
      />
      to
      <Input
        className={cn({ "border-green-600 bg-green-50": isActive })}
        disabled
        type="time"
        value={endTime ? formatTime(endTime) : ""}
      />
      <Input
        className={cn({ "border-green-600 bg-green-50": isActive })}
        disabled
        value={`${duration.toFixed(1)} hours`}
      />
      <ProjectSelect
        className={cn({ "border-green-600 bg-green-50": isActive })}
        onValueChange={handleProjectChange}
        value={entry.project}
      />
      {entry.endTime ? (
        <WorkEntryActions entry={entry} entries={entries} />
      ) : (
        <ActiveWorkEntryActions entry={entry} />
      )}
    </div>
  );
}

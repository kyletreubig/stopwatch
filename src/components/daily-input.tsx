import { ActiveWorkEntry } from "./active-work-entry";
import { WorkEntry } from "./work-entry";

export function DailyInput() {
  return (
    <div className="flex flex-col gap-2">
      <WorkEntry />
      <WorkEntry />
      <ActiveWorkEntry />
    </div>
  );
}

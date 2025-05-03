import { ActiveWorkEntryActions } from "./active-work-entry-actions";
import { ProjectSelect } from "./project-select";
import { Input } from "./ui/input";

export function ActiveWorkEntry() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-2 items-center">
      <Input type="time" />
      to
      <Input type="time" />
      <Input placeholder="Hours" />
      <ProjectSelect />
      <ActiveWorkEntryActions />
    </div>
  );
}

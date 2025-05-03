import { ActiveWorkEntryActions } from "./active-work-entry-actions";
import { ProjectSelect } from "./project-select";
import { Input } from "./ui/input";

export function ActiveWorkEntry() {
  return (
    <div className="flex gap-2 items-center">
      <Input type="time" />
      to
      <Input type="time" />
      <Input placeholder="Hours" />
      <ProjectSelect />
      <ActiveWorkEntryActions />
    </div>
  );
}

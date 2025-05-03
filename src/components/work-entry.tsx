import { ProjectSelect } from "./project-select";
import { Input } from "./ui/input";
import { WorkEntryActions } from "./work-entry-actions";

export function WorkEntry() {
  return (
    <div className="flex gap-2 items-center">
      <Input type="time" />
      to
      <Input type="time" />
      <Input placeholder="Hours" />
      <ProjectSelect />
      <WorkEntryActions />
    </div>
  );
}

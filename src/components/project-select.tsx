import { useProjects } from "@/api/get-projects";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ProjectSelect() {
  const projects = useProjects();
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        {projects?.map((project) => (
          <SelectItem key={project.id} value={project.name}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import { type SelectProps } from "@radix-ui/react-select";

import { useProjects } from "@/api/get-projects";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ProjectSelect(props: SelectProps) {
  const projects = useProjects();
  return (
    <Select {...props}>
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

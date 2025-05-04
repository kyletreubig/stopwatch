import type { SelectTriggerProps, SelectProps } from "@radix-ui/react-select";

import { useProjects } from "@/api/get-projects";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = SelectProps & {
  className?: SelectTriggerProps["className"];
};

export function ProjectSelect({ className, ...props }: Props) {
  const projects = useProjects();
  return (
    <Select {...props}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__break">break</SelectItem>
        <SelectSeparator />
        {projects?.map((project) => (
          <SelectItem key={project.id} value={project.name}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

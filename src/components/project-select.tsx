import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ProjectSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Project 1</SelectItem>
        <SelectItem value="2">Project 2</SelectItem>
      </SelectContent>
    </Select>
  );
}

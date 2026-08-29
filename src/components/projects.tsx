import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { addProject } from "@/api/add-project";
import { useProjects } from "@/api/get-projects";
import {
  resetProjectAllocations,
  updateProjectAllocation,
} from "@/api/update-project";
import { sumProjectAllocations } from "@/utils/sum-project-allocations";

import { DeleteProjectButton } from "./delete-project-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Inputs = { name: string };

export function Projects() {
  const projects = useProjects();

  const form = useForm<Inputs>({
    defaultValues: { name: "" },
  });

  const onSubmit = ({ name }: Inputs) => addProject(name);
  const totalAllocation = sumProjectAllocations(projects ?? []);

  return (
    <div className="p-4 border rounded shadow">
      <h2>Projects </h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="w-32">Allocation</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Input
                    className="w-24"
                    max={100}
                    min={0}
                    onChange={(event) => {
                      const parsed = Number(event.target.value);
                      void updateProjectAllocation(
                        project.id,
                        Number.isFinite(parsed) ? parsed : 0,
                      );
                    }}
                    type="number"
                    value={project.allocation ?? 0}
                  />
                </TableCell>
                <TableCell>
                  <DeleteProjectButton project={project} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Input
                  placeholder="New project name"
                  {...form.register("name", { required: true })}
                />
              </TableCell>
              <TableCell />
              <TableCell>
                <Button
                  className="w-full"
                  disabled={!form.formState.isDirty || !form.formState.isValid}
                  type="submit"
                >
                  <Plus /> Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-sm">
          Total allocation: {totalAllocation}%
          {totalAllocation > 100 && (
            <span className="ml-2 text-amber-600">Warning: over 100%</span>
          )}
        </div>
        <Button
          onClick={() => void resetProjectAllocations()}
          variant="outline"
        >
          Reset all allocations
        </Button>
      </div>
    </div>
  );
}

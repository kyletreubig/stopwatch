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
    <div className="rounded-xl border p-3 shadow sm:p-4">
      <h2 className="text-2xl font-semibold sm:text-base sm:font-medium">
        Projects
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="w-20 sm:w-32">Allocation</TableHead>
              <TableHead className="w-20 sm:w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Input
                    className="w-20 sm:w-24"
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
              <TableCell colSpan={2}>
                <Input
                  className="min-w-44"
                  placeholder="New project name"
                  {...form.register("name", { required: true })}
                />
              </TableCell>
              <TableCell>
                <Button
                  className="w-full"
                  disabled={!form.formState.isDirty || !form.formState.isValid}
                  type="submit"
                >
                  <Plus />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>

      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div className="text-sm">
          Total allocation: {totalAllocation}%
          {totalAllocation > 100 && (
            <span className="ml-2 text-amber-600">Warning: over 100%</span>
          )}
        </div>
        <Button
          className="h-11 w-full sm:h-9 sm:w-auto"
          onClick={() => void resetProjectAllocations()}
          variant="outline"
        >
          Reset all allocations
        </Button>
      </div>
    </div>
  );
}

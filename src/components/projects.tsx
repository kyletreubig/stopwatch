import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { addProject } from "@/api/add-project";
import { useProjects } from "@/api/get-projects";
import { Project } from "@/db";

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

type Inputs = Omit<Project, "id">;

export function Projects() {
  const projects = useProjects();

  const form = useForm<Inputs>({
    defaultValues: { name: "" },
  });

  const onSubmit = ({ name }: Inputs) => addProject(name);

  return (
    <div className="p-4 border rounded shadow">
      <h2>Projects </h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
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
    </div>
  );
}

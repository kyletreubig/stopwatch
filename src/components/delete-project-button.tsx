import { Trash2 } from "lucide-react";

import { deleteProject } from "@/api/delete-project";
import { type Project } from "@/db";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function DeleteProjectButton({ project }: { project: Project }) {
  const handleDelete = async () => deleteProject(project.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Delete project"
          className="w-full"
          variant="destructive"
        >
          <Trash2 className="sm:hidden" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {project.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

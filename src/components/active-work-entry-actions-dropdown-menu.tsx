import { Ellipsis, Check, X, Clock } from "lucide-react";

import { deleteWorkEntry } from "@/api/delete-work-entry";
import { updateWorkEntry } from "@/api/update-work-entry";
import { WorkEntry } from "@/db";
import { WorkEntryActionTypes } from "@/types";
import { clearSeconds } from "@/utils/clear-seconds";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ActiveWorkEntryActionsDropdownMenu({
  entry,
  onSelect,
}: {
  entry: WorkEntry;
  onSelect: (action: WorkEntryActionTypes) => void;
}) {
  const handleComplete = () =>
    updateWorkEntry(entry.id, { endTime: clearSeconds(new Date()) });

  const handleCancel = () => deleteWorkEntry(entry.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleComplete}>
          <Check /> Complete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("complete")}>
          <Clock /> Complete at...
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCancel}>
          <X /> Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

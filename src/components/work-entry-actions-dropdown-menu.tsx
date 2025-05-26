import {
  Ellipsis,
  MoveVertical,
  SquareSplitVertical,
  BetweenHorizonalStart,
  ArrowDownToLine,
  X,
  Merge,
} from "lucide-react";

import { deleteWorkEntry } from "@/api/delete-work-entry";
import { WorkEntry } from "@/db";
import { WorkEntryActionTypes } from "@/types";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function WorkEntryActionsDropdownMenu({
  canDelete,
  entry,
  onSelect,
}: {
  canDelete?: boolean;
  entry: WorkEntry;
  onSelect: (action: WorkEntryActionTypes) => void;
}) {
  const handleDelete = () => {
    if (canDelete) {
      deleteWorkEntry(entry.id);
    }
  };

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
        <DropdownMenuItem onClick={() => onSelect("shift")}>
          <MoveVertical /> Shift
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("resize")}>
          <ArrowDownToLine /> Resize
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelect("split")}>
          <SquareSplitVertical /> Split
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("interject")}>
          <BetweenHorizonalStart /> Interject
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelect("merge")}>
          <Merge /> Merge
        </DropdownMenuItem>
        {canDelete && (
          <DropdownMenuItem onClick={handleDelete}>
            <X /> Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

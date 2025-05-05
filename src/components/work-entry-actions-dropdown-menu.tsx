import {
  Ellipsis,
  ChevronsDownUp,
  ChevronsUpDown,
  MoveVertical,
  SquareSplitVertical,
  BetweenHorizonalStart,
} from "lucide-react";

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
  onSelect,
}: {
  onSelect: (action: WorkEntryActionTypes) => void;
}) {
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
        <DropdownMenuItem onClick={() => onSelect("shrink")}>
          <ChevronsDownUp /> Shrink
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("grow")}>
          <ChevronsUpDown /> Grow
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("shift")}>
          <MoveVertical /> Shift
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelect("split")}>
          <SquareSplitVertical /> Split
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("interject")}>
          <BetweenHorizonalStart /> Interject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

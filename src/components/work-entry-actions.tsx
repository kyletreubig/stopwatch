import {
  Ellipsis,
  ChevronsDownUp,
  ChevronsUpDown,
  MoveVertical,
  SquareSplitVertical,
  BetweenHorizonalStart,
  X,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function WorkEntryActions() {
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
        <DropdownMenuItem>
          <ChevronsDownUp /> Shrink
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ChevronsUpDown /> Grow
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MoveVertical /> Shift
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SquareSplitVertical /> Split
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BetweenHorizonalStart /> Interject
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <X /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

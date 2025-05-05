import { DialogDescription } from "@radix-ui/react-dialog";
import { MoveVertical } from "lucide-react";

import { WorkEntryActionProps } from "@/types";

import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function ShiftWorkEntryDialogContent({
  entry,
  entries,
}: WorkEntryActionProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Shift Entry</DialogTitle>
        <DialogDescription>
          Move this entry to start earlier or later, adjusting the adjacent
          entries as needed.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {JSON.stringify(entry)}
        {entries?.length}
      </div>
      <DialogFooter>
        <Button>
          <MoveVertical /> Shift
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

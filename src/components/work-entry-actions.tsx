import { useState } from "react";

import { WorkEntry } from "@/db";
import { WorkEntryActionComponent, WorkEntryActionTypes } from "@/types";

import { ShiftWorkEntryDialogContent } from "./shift-work-entry-dialog-content";
import { Dialog } from "./ui/dialog";
import { WorkEntryActionsDropdownMenu } from "./work-entry-actions-dropdown-menu";

const ActionComponents: Record<WorkEntryActionTypes, WorkEntryActionComponent> =
  {
    shrink: ShiftWorkEntryDialogContent,
    grow: ShiftWorkEntryDialogContent,
    shift: ShiftWorkEntryDialogContent,
    split: ShiftWorkEntryDialogContent,
    interject: ShiftWorkEntryDialogContent,
  };

export function WorkEntryActions({
  entry,
  entries,
}: {
  entry: WorkEntry;
  entries?: WorkEntry[];
}) {
  const [action, setAction] = useState<WorkEntryActionTypes | null>(null);
  const ActionComponent = ActionComponents[action || "grow"];

  return (
    <Dialog onOpenChange={() => setAction(null)} open={Boolean(action)}>
      <WorkEntryActionsDropdownMenu onSelect={setAction} />
      {action && <ActionComponent entry={entry} entries={entries} />}
    </Dialog>
  );
}

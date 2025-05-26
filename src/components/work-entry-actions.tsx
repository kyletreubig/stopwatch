import { useState } from "react";

import { WorkEntry } from "@/db";
import { WorkEntryActionComponent, WorkEntryActionTypes } from "@/types";

import { InterjectWorkEntryDialogContent } from "./interject-work-entry-dialog-content";
import { ShiftWorkEntryDialogContent } from "./shift-work-entry-dialog-content";
import { SplitWorkEntryDialogContent } from "./split-work-entry-dialog-contents";
import { Dialog } from "./ui/dialog";
import { WorkEntryActionsDropdownMenu } from "./work-entry-actions-dropdown-menu";

const ActionComponents: Partial<
  Record<WorkEntryActionTypes, WorkEntryActionComponent>
> = {
  // shrink: ShiftWorkEntryDialogContent,
  // grow: ShiftWorkEntryDialogContent,
  shift: ShiftWorkEntryDialogContent,
  split: SplitWorkEntryDialogContent,
  interject: InterjectWorkEntryDialogContent,
};

export function WorkEntryActions({
  entry,
  entries,
}: {
  entry: WorkEntry;
  entries?: WorkEntry[];
}) {
  const [action, setAction] = useState<WorkEntryActionTypes | null>(null);
  const ActionComponent = ActionComponents[action as WorkEntryActionTypes];

  return (
    <Dialog onOpenChange={() => setAction(null)} open={Boolean(action)}>
      <WorkEntryActionsDropdownMenu onSelect={setAction} />
      {ActionComponent && (
        <ActionComponent
          entry={entry}
          entries={entries}
          onClose={() => setAction(null)}
        />
      )}
    </Dialog>
  );
}

import { useState } from "react";

import { WorkEntry } from "@/db";
import { WorkEntryActionComponent, WorkEntryActionTypes } from "@/types";

import { InterjectWorkEntryDialogContent } from "./interject-work-entry-dialog-content";
import { ResizeWorkEntryDialogContent } from "./resize-work-entry-dialog-content";
import { ShiftWorkEntryDialogContent } from "./shift-work-entry-dialog-content";
import { SplitWorkEntryDialogContent } from "./split-work-entry-dialog-contents";
import { Dialog } from "./ui/dialog";
import { WorkEntryActionsDropdownMenu } from "./work-entry-actions-dropdown-menu";

const ActionComponents: Partial<
  Record<WorkEntryActionTypes, WorkEntryActionComponent>
> = {
  shift: ShiftWorkEntryDialogContent,
  resize: ResizeWorkEntryDialogContent,
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
  const isFirst = entries?.at(0)?.id === entry.id;
  const isLast = entries?.at(-1)?.id === entry.id;

  return (
    <Dialog onOpenChange={() => setAction(null)} open={Boolean(action)}>
      <WorkEntryActionsDropdownMenu
        canDelete={isFirst || isLast}
        entry={entry}
        onSelect={setAction}
      />
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

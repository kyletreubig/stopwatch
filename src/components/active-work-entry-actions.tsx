import { useState } from "react";

import type { WorkEntry } from "@/db";
import { WorkEntryActionComponent, WorkEntryActionTypes } from "@/types";

import { ActiveWorkEntryActionsDropdownMenu } from "./active-work-entry-actions-dropdown-menu";
import { CompleteWorkEntryDialogContent } from "./complete-work-entry-dialog-content";
import { Dialog } from "./ui/dialog";

const ActionComponents: Partial<
  Record<WorkEntryActionTypes, WorkEntryActionComponent>
> = {
  complete: CompleteWorkEntryDialogContent,
};

export function ActiveWorkEntryActions({
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
      <ActiveWorkEntryActionsDropdownMenu entry={entry} onSelect={setAction} />
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

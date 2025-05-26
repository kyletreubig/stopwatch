import type React from "react";

import type { WorkEntry } from "./db";

export type WorkEntryActionTypes =
  | "shift"
  | "resize"
  | "split"
  | "interject"
  | "merge"
  | "complete";

export type WorkEntryActionProps = {
  entry: WorkEntry;
  entries?: WorkEntry[];
  onClose: () => void;
};

export type WorkEntryActionComponent = React.FC<WorkEntryActionProps>;

export type WorkEntryChange = {
  id: number;
  values?: Omit<WorkEntry, "id">;
  updates?: Partial<Omit<WorkEntry, "id">>;
  delete?: boolean;
};

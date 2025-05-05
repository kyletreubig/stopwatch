import type React from "react";

import type { WorkEntry } from "./db";

export type WorkEntryActionTypes =
  | "shrink"
  | "grow"
  | "shift"
  | "split"
  | "interject";

export type WorkEntryActionProps = {
  entry: WorkEntry;
  entries?: WorkEntry[];
  onClose: () => void;
};

export type WorkEntryActionComponent = React.FC<WorkEntryActionProps>;

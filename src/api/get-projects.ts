import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db";

export function useProjects() {
  return useLiveQuery(() => db.projects.toArray());
}

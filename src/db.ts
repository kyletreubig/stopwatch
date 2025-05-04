import Dexie, { type EntityTable } from "dexie";

export interface Project {
  id: number;
  name: string;
}

export interface WorkEntry {
  id: number;
  project: string;
  startTime: Date;
  endTime: Date | null;
  note?: string;
}

export const db = new Dexie("StopwatchDB") as Dexie & {
  projects: EntityTable<Project, "id">;
  workEntries: EntityTable<WorkEntry, "id">;
};

db.version(1).stores({
  projects: "++id,&name",
  workEntries: "++id,project,startTime,endTime",
});

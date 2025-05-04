import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Show = "active" | "archived";

export function Projects() {
  const [show, setShow] = useState<Show>("active");

  return (
    <Tabs
      className="p-4 border rounded shadow"
      onValueChange={(v) => setShow(v as Show)}
      value={show}
    >
      <h2 className="flex justify-between">
        Projects
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </h2>

      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead className="w-32" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Project 1</TableCell>
            <TableCell>
              <Button className="w-full" variant="outline">
                {show == "active" ? "Archive" : "Unarchive"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Project 2</TableCell>
            <TableCell>
              <Button className="w-full" variant="outline">
                {show == "active" ? "Archive" : "Unarchive"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Input
                disabled={show == "archived"}
                placeholder="New project name"
              />
            </TableCell>
            <TableCell>
              <Button className="w-full" disabled={show == "archived"}>
                <Plus /> Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Tabs>
  );
}

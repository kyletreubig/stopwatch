import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function DailySummary() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Project 1</TableCell>
          <TableCell>2.0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Project 2</TableCell>
          <TableCell>6.0</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>8.0</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

import { MoveVertical } from "lucide-react";
import { useForm } from "react-hook-form";

import { updateWorkEntry } from "@/api/update-work-entry";
import { WorkEntryActionProps } from "@/types";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";

import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

type Inputs = {
  newStartTime: Date;
  shiftAdjacent: boolean;
};

export function ShiftWorkEntryDialogContent({
  entry,
  entries,
  onClose,
}: WorkEntryActionProps) {
  const form = useForm<Inputs>({
    defaultValues: {
      newStartTime: entry.startTime,
      shiftAdjacent: true,
    },
  });

  const onSubmit = ({ newStartTime, shiftAdjacent }: Inputs) => {
    if (!entries) return; // Impossible to happen at this point

    const shiftAmount = newStartTime.getTime() - entry.startTime.getTime();
    if (shiftAdjacent) {
      for (const neighbor of entries) {
        const startTime = new Date(neighbor.startTime.getTime() + shiftAmount);
        const endTime = neighbor.endTime
          ? new Date(neighbor.endTime.getTime() + shiftAmount)
          : null;
        updateWorkEntry(neighbor.id, { startTime, endTime });
      }
      // } else {
      //   const newEndTime = entry.endTime ? new Date(entry.endTime.getTime() + shiftAmount) : null;
      //   for (const neighbor of entries) {
      //     if (shiftAmount < 0 && neighbor.startTime > newStartTime) {
      //   }
    }

    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Shift Entry</DialogTitle>
        <DialogDescription>
          Move this entry to start earlier or later, adjusting the adjacent
          entries as needed.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid gap-4 py-4"
          id="shift-work-entry-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="newStartTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Start Time</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange(parseTime(entry.startTime, e.target.value))
                    }
                    type="time"
                    value={formatTime(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shiftAdjacent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Adjacent Entries</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Else adjacent entry will shrink or grow as needed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          disabled={!form.formState.isDirty || !form.formState.isValid}
          form="shift-work-entry-form"
          type="submit"
        >
          <MoveVertical /> Shift
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

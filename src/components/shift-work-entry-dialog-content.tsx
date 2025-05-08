import { AlertCircle, MoveVertical } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";
import { shiftEntries, shiftEntry } from "@/utils/shift-work-entry";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = ({ newStartTime, shiftAdjacent }: Inputs) => {
    if (!entries) return; // Impossible to happen at this point

    const shiftAmount = newStartTime.getTime() - entry.startTime.getTime();
    if (shiftAdjacent) {
      shiftEntries(entries, shiftAmount)
        .then(applyWorkEntryChanges)
        .then(onClose)
        .catch(setErrorMsg);
    } else {
      shiftEntry(entry, entries, shiftAmount)
        .then(applyWorkEntryChanges)
        .then(onClose)
        .catch(setErrorMsg);
    }
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
      {errorMsg && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
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

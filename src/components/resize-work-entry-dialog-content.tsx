import { AlertCircle, ArrowDownToLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";
import { resizeWorkEntry } from "@/utils/work-entry-actions";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Inputs = {
  newEndTime: Date;
};

export function ResizeWorkEntryDialogContent({
  entry,
  entries,
  onClose,
}: WorkEntryActionProps) {
  const form = useForm<Inputs>({
    defaultValues: {
      newEndTime: entry.endTime || new Date(),
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = ({ newEndTime }: Inputs) => {
    if (!entries) return; // Impossible to happen at this point

    const resizeAmount = newEndTime.getTime() - entry.endTime!.getTime();
    resizeWorkEntry(entry, entries, resizeAmount)
      .then(applyWorkEntryChanges)
      .then(onClose)
      .catch(setErrorMsg);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Resize Entry</DialogTitle>
        <DialogDescription>
          Adjust the end time of this work entry, adjusting the adjacent entries
          as needed.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="resize-work-entry-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="newEndTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New End Time</FormLabel>
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
        <Button form="resize-work-entry-form" type="submit">
          <ArrowDownToLine /> Resize
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

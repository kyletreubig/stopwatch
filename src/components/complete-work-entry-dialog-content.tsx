import { AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { calcDuration } from "@/utils/calc-duration";
import { clearSeconds } from "@/utils/clear-seconds";
import { completeWorkEntry } from "@/utils/complete-work-entry";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

type Inputs = {
  endTime: Date;
};

export function CompleteWorkEntryDialogContent({
  entry,
  onClose,
}: WorkEntryActionProps) {
  const form = useForm<Inputs>({
    defaultValues: {
      endTime: clearSeconds(new Date()),
    },
  });

  const endTime = form.watch("endTime");
  const duration = calcDuration(entry.startTime, endTime);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = ({ endTime }: Inputs) => {
    completeWorkEntry(entry, endTime)
      .then(applyWorkEntryChanges)
      .then(onClose)
      .catch(setErrorMsg);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Complete Entry</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-2 py-4 items-end"
          id="complete-work-entry-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) =>
                      field.onChange(parseTime(entry.startTime, e.target.value))
                    }
                    type="time"
                    value={formatTime(field.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Input disabled value={`${duration.toFixed(1)} hours`} />
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
        <Button form="complete-work-entry-form" type="submit">
          <Clock /> Complete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

import { AlertCircle, SquareSplitVertical } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";
import { splitWorkEntry } from "@/utils/work-entry-actions";

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

type Inputs = {
  splitAt: Date;
};

export function SplitWorkEntryDialogContent({
  entry,
  onClose,
}: WorkEntryActionProps) {
  const form = useForm<Inputs>({
    defaultValues: {
      splitAt: entry.startTime,
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = (inputs: Inputs) => {
    splitWorkEntry(entry, inputs.splitAt)
      .then(applyWorkEntryChanges)
      .then(onClose)
      .catch(setErrorMsg);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Split Work Entry</DialogTitle>
        <DialogDescription>
          Split an entry into two at the specified time.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form id="split-work-entry-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="splitAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Split At</FormLabel>
                <FormControl>
                  <input
                    type="time"
                    onChange={(e) =>
                      field.onChange(parseTime(entry.startTime, e.target.value))
                    }
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
        <Button form="split-work-entry-form" type="submit">
          <SquareSplitVertical /> Split
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

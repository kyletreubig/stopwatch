import { AlertCircle, Merge } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { mergeWorkEntry } from "@/utils/work-entry-actions";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Switch } from "./ui/switch";

type Inputs = {
  mergeNext: boolean;
};

export function MergeWorkEntryDialogContent({
  entry,
  entries,
  onClose,
}: WorkEntryActionProps) {
  const isFirst = entries?.at(0)?.id === entry.id;
  const isLast = entries?.at(-1)?.id === entry.id;
  const isFixed = isFirst || isLast;

  const form = useForm<Inputs>({
    defaultValues: {
      mergeNext: isFirst,
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = ({ mergeNext }: Inputs) => {
    if (!entries) return; // Impossible to happen at this point

    mergeWorkEntry(entry, entries, mergeNext ? "next" : "prior")
      .then(applyWorkEntryChanges)
      .then(onClose)
      .catch(setErrorMsg);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Merge Entry</DialogTitle>
        <DialogDescription>
          Merge this work entry with an adjacent entry.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form id="merge-work-entry-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="mergeNext"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel
                  className={cn({
                    "text-muted-foreground": field.value,
                    "cursor-not-allowed": isFixed,
                    "opacity-50": isFixed && field.value,
                  })}
                >
                  With prior entry
                </FormLabel>
                <FormControl>
                  <Switch
                    disabled={isFixed}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  className={cn({
                    "text-muted-foreground": !field.value,
                    "opacity-100!": isFixed && field.value,
                  })}
                >
                  With next entry
                </FormLabel>
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
        <Button form="merge-work-entry-form" type="submit">
          <Merge /> Merge
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

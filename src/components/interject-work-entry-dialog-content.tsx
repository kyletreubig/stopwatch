import { AlertCircle, BetweenHorizonalStart } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { WorkEntry } from "@/db";
import { WorkEntryActionProps } from "@/types";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { calcDuration } from "@/utils/calc-duration";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";
import { interjectWorkEntry } from "@/utils/work-entry-actions";

import { ProjectSelect } from "./project-select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Form } from "./ui/form";
import { Input } from "./ui/input";

type Inputs = Omit<WorkEntry, "id"> & {
  endTime: Date;
};

export function InterjectWorkEntryDialogContent({
  entry,
  onClose,
}: WorkEntryActionProps) {
  const form = useForm<Inputs>({
    defaultValues: {
      startTime: entry.startTime,
      endTime: entry.endTime || entry.startTime,
      project: entry.project,
    },
  });
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const duration = endTime ? calcDuration(startTime, endTime) : 0;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = (inputs: Inputs) => {
    interjectWorkEntry(entry, inputs)
      .then(applyWorkEntryChanges)
      .then(onClose)
      .catch(setErrorMsg);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Interject Work Entry</DialogTitle>
        <DialogDescription>
          Insert a new entry in the middle of this entry.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid grid-cols-[1fr_auto_1fr_1fr_1fr] gap-2 items-center py-4"
          id="interject-work-entry-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="startTime"
            control={form.control}
            render={({ field }) => (
              <input
                type="time"
                onChange={(e) =>
                  field.onChange(parseTime(entry.startTime, e.target.value))
                }
                value={formatTime(field.value)}
              />
            )}
          />
          to
          <Controller
            name="endTime"
            control={form.control}
            render={({ field }) => (
              <input
                type="time"
                onChange={(e) =>
                  field.onChange(parseTime(entry.startTime, e.target.value))
                }
                value={formatTime(field.value)}
              />
            )}
          />
          <Input
            disabled
            placeholder="Hours"
            value={`${duration.toFixed(1)} hours`}
          />
          <Controller
            name="project"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <ProjectSelect
                onValueChange={field.onChange}
                value={field.value}
              />
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
          form="interject-work-entry-form"
          type="submit"
        >
          <BetweenHorizonalStart /> Interject
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

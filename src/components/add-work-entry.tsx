import { AlertCircle, Play, Plus, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { type WorkEntry } from "@/db";
import { applyWorkEntryChanges } from "@/utils/apply-work-entry-changes";
import { calcDuration } from "@/utils/calc-duration";
import { clearSeconds } from "@/utils/clear-seconds";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";
import { addWorkEntry } from "@/utils/work-entry-actions";

import { ProjectSelect } from "./project-select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Inputs = Omit<WorkEntry, "id">;

export function AddWorkEntry({
  date,
  entries,
}: {
  date: Date;
  entries?: WorkEntry[];
}) {
  const lastEntry = useMemo(() => entries?.at(-1), [entries]);

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      startTime: lastEntry?.endTime || clearSeconds(new Date()),
      endTime: null,
      project: "",
    },
  });
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const duration = endTime ? calcDuration(startTime, endTime) : 0;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = (inputs: Inputs) => {
    addWorkEntry(inputs, entries || [])
      .then(applyWorkEntryChanges)
      // .then(() => reset({ startTime: add(date, { days: 1 }), endTime: null, project: "" }))
      .catch(setErrorMsg);
  };

  return (
    <form
      className="flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr_auto_auto] gap-2 items-center">
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <Input
              onChange={(e) => field.onChange(parseTime(date, e.target.value))}
              type="time"
              value={formatTime(field.value)}
            />
          )}
        />
        to
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <Input
              onChange={(e) => field.onChange(parseTime(date, e.target.value))}
              type="time"
              value={field.value ? formatTime(field.value) : ""}
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
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ProjectSelect onValueChange={field.onChange} value={field.value} />
          )}
        />
        <Button disabled={!isDirty || !isValid} type="submit">
          {endTime ? (
            <>
              <Plus /> Add
            </>
          ) : (
            <>
              <Play /> Start
            </>
          )}
        </Button>
        <Button
          onClick={() => reset()}
          size="icon"
          type="reset"
          variant="outline"
        >
          <RefreshCw />
        </Button>
      </div>
      {isDirty && errorMsg && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}

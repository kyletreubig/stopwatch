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
      className="mt-4 flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 rounded-xl border bg-card/70 p-3 shadow-sm sm:grid sm:grid-cols-[1fr_auto_1fr_1fr_1fr_auto_auto] sm:items-center sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center sm:contents">
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <Input
                onChange={(e) =>
                  field.onChange(parseTime(date, e.target.value))
                }
                type="time"
                value={formatTime(field.value)}
              />
            )}
          />
          <span className="text-center text-sm text-muted-foreground">to</span>
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <Input
                onChange={(e) =>
                  field.onChange(parseTime(date, e.target.value))
                }
                type="time"
                value={field.value ? formatTime(field.value) : ""}
              />
            )}
          />
        </div>
        <Input
          className="text-center"
          disabled
          placeholder="Hours"
          value={`${duration.toFixed(1)} hours`}
        />
        <Controller
          name="project"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ProjectSelect
              className="h-11 sm:h-9"
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-2 sm:contents">
          <Button
            className="h-11 sm:h-9"
            disabled={!isDirty || !isValid}
            type="submit"
          >
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
            className="h-11 w-full sm:h-9 sm:w-9"
            onClick={() => reset()}
            size="icon"
            type="reset"
            variant="outline"
          >
            <RefreshCw />
          </Button>
        </div>
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

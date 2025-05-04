import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { addWorkEntry } from "@/api/add-work-entry";
import { type WorkEntry } from "@/db";
import { calcDuration } from "@/utils/calc-duration";
import { formatTime } from "@/utils/format-time";
import { parseTime } from "@/utils/parse-time";

import { ProjectSelect } from "./project-select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Inputs = Omit<WorkEntry, "id">;

export function AddWorkEntry({ date }: { date: Date }) {
  const form = useForm<Inputs>({
    defaultValues: {
      startTime: new Date(),
      endTime: null,
      project: "",
    },
  });
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const duration = endTime ? calcDuration(startTime, endTime) : 0;

  const onSubmit = (data: Inputs) => addWorkEntry(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-2 items-center">
        <Controller
          name="startTime"
          control={form.control}
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
          control={form.control}
          render={({ field }) => (
            <Input
              onChange={(e) => field.onChange(parseTime(date, e.target.value))}
              type="time"
              value={field.value ? formatTime(field.value) : ""}
            />
          )}
        />
        <Input disabled placeholder="Hours" value={duration} />
        <Controller
          name="project"
          control={form.control}
          render={({ field }) => (
            <ProjectSelect onValueChange={field.onChange} value={field.value} />
          )}
        />
        <Button disabled={!form.formState.isValid} type="submit">
          <Plus /> Add
        </Button>
      </div>
    </form>
  );
}

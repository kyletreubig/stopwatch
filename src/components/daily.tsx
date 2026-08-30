import { useDateSelectionStore } from "@/stores/date-selection";
import { formatDate } from "@/utils/format-date";

import { DailyInput } from "./daily-input";
import { DailySummary } from "./daily-summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Daily() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  return (
    <Tabs className="rounded-xl border p-3 shadow sm:p-4" defaultValue="input">
      <h2 className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-2xl font-semibold sm:text-5xl">
          {formatDate(selectedDate, { long: true })}
        </span>
        <TabsList className="w-full sm:w-fit">
          <TabsTrigger className="h-10 sm:h-8" value="input">
            Input
          </TabsTrigger>
          <TabsTrigger className="h-10 sm:h-8" value="summary">
            Summary
          </TabsTrigger>
        </TabsList>
      </h2>

      <TabsContent value="input">
        <DailyInput />
      </TabsContent>

      <TabsContent value="summary">
        <DailySummary />
      </TabsContent>
    </Tabs>
  );
}

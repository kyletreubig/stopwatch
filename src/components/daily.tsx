import { useDateSelectionStore } from "@/stores/date-selection";
import { formatDate } from "@/utils/format-date";

import { DailyInput } from "./daily-input";
import { DailySummary } from "./daiy-summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Daily() {
  const selectedDate = useDateSelectionStore.use.selectedDate();
  return (
    <Tabs className="p-4 border rounded shadow" defaultValue="input">
      <div className="flex justify-between">
        <h2>{formatDate(selectedDate, { long: true })}</h2>
        <TabsList>
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="input">
        <DailyInput />
      </TabsContent>

      <TabsContent value="summary">
        <DailySummary />
      </TabsContent>
    </Tabs>
  );
}

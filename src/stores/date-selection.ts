import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";
import { clearTime } from "@/utils/clear-time";

interface DateSelectionState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useDateSelectionStore = createSelectors(
  create<DateSelectionState>()((set) => ({
    selectedDate: clearTime(new Date()),
    setSelectedDate: (selectedDate: Date) =>
      set({ selectedDate: clearTime(selectedDate) }),
  })),
);

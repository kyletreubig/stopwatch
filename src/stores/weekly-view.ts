import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";

interface WeeklyViewState {
  weeksToDisplay: number;
  setWeeksToDisplay: (weeks: number) => void;
}

export const useWeeklyViewStore = createSelectors(
  create<WeeklyViewState>()((set) => ({
    weeksToDisplay: 1,
    setWeeksToDisplay: (weeksToDisplay: number) =>
      set({ weeksToDisplay: Math.min(Math.max(weeksToDisplay, 1), 12) }),
  })),
);

import { create } from "zustand";

import { createSelectors } from "@/lib/zustand";
import { clearTime } from "@/utils/clear-time";

interface DateSelectionState {
  selectedDate: Date;
  isMobilePanelCollapsed: boolean;
  setSelectedDate: (date: Date) => void;
  setMobilePanelCollapsed: (collapsed: boolean) => void;
  toggleMobilePanelCollapsed: () => void;
}

export const useDateSelectionStore = createSelectors(
  create<DateSelectionState>()((set) => ({
    selectedDate: clearTime(new Date()),
    isMobilePanelCollapsed: true,
    setSelectedDate: (selectedDate: Date) =>
      set({ selectedDate: clearTime(selectedDate) }),
    setMobilePanelCollapsed: (isMobilePanelCollapsed: boolean) =>
      set({ isMobilePanelCollapsed }),
    toggleMobilePanelCollapsed: () =>
      set((state) => ({
        isMobilePanelCollapsed: !state.isMobilePanelCollapsed,
      })),
  })),
);

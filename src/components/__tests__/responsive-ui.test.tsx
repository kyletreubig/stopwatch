import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DateSelection } from "@/components/date-selection";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { Projects } from "@/components/projects";
import { Weekly } from "@/components/weekly";
import { useDateSelectionStore } from "@/stores/date-selection";
import { useWeeklyViewStore } from "@/stores/weekly-view";

vi.mock("@/api/get-projects", () => ({
  useProjects: vi.fn(() => [
    { id: 1, name: "Project A", allocation: 50 },
    { id: 2, name: "Project B", allocation: 50 },
  ]),
}));

vi.mock("@/api/get-work-entries", () => ({
  useWorkEntries: vi.fn(() => []),
}));

vi.mock("@/api/add-project", () => ({
  addProject: vi.fn(() => Promise.resolve()),
}));

vi.mock("@/api/update-project", () => ({
  resetProjectAllocations: vi.fn(() => Promise.resolve()),
  updateProjectAllocation: vi.fn(() => Promise.resolve()),
}));

vi.mock("@/api/delete-project", () => ({
  deleteProject: vi.fn(() => Promise.resolve()),
}));

describe("responsive UI contracts", () => {
  beforeEach(() => {
    useDateSelectionStore.setState({
      selectedDate: new Date(2026, 7, 30),
      isMobilePanelCollapsed: true,
    });
    useWeeklyViewStore.setState({ weeksToDisplay: 1 });
  });

  it("keeps date selection collapsed by default on mobile and toggles from trigger", () => {
    render(<DateSelection />);

    const toggle = screen.getByRole("button", {
      name: "Toggle date selection panel",
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(useDateSelectionStore.getState().isMobilePanelCollapsed).toBe(true);

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(useDateSelectionStore.getState().isMobilePanelCollapsed).toBe(false);
  });

  it("keeps weekly label after stepper controls", () => {
    render(<Weekly />);

    const label = screen.getByText("Weeks");
    const input = screen.getByLabelText("Weeks");

    const container = label.parentElement;
    expect(container).toBeTruthy();

    const inputIndex = Array.from(container!.children).indexOf(input);
    const labelIndex = Array.from(container!.children).indexOf(label);

    expect(inputIndex).toBeGreaterThan(-1);
    expect(labelIndex).toBeGreaterThan(inputIndex);
  });

  it("uses mobile-hidden text labels for project add and delete actions", () => {
    render(
      <DeleteProjectButton
        project={{ id: 1, name: "Project A", allocation: 50 }}
      />,
    );

    const deleteText = screen.getByText("Delete");
    expect(deleteText).toHaveClass("hidden", "sm:inline");

    render(<Projects />);

    const addText = screen.getByText("Add");
    expect(addText).toHaveClass("hidden", "sm:inline");
  });
});

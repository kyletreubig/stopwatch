export type AllocationStatus = "green" | "yellow" | "red";

export function getProjectAllocationStatus(
  sharePercentage: number,
  allocationPercentage: number,
  complete: boolean,
): AllocationStatus {
  if (sharePercentage <= allocationPercentage) return "green";
  return complete ? "red" : "yellow";
}

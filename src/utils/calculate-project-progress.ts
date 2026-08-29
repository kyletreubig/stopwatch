export function calculateProjectProgress(
  sharePercentage: number,
  allocationPercentage: number,
): number {
  if (sharePercentage <= 0) return 0;
  if (allocationPercentage <= 0) return 100;
  return Math.min((sharePercentage / allocationPercentage) * 100, 100);
}

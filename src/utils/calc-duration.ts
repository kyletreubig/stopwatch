export function calcDuration(startTime: Date, endTime: Date): number {
  // as hours
  return Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60) / 60;
}

export function calcDuration(startTime: Date, endTime: Date): number {
  // as hours, rounded to the nearest tenth of an hour
  return (
    Math.round(
      ((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60) * 10,
    ) / 10
  );
}

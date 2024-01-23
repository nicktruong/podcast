export function getNumberOfDaysInMonth({
  year,
  month,
}: {
  year: number | string;
  month: number | string;
}) {
  return new Date(+year, +month + 1, 0).getDate();
}

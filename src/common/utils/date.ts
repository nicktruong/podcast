interface YearMonth {
  year: number | string;
  month: number | string;
}

export const getNumberOfDaysInMonth = ({ year, month }: YearMonth) => {
  return new Date(+year, +month + 1, 0).getDate();
};

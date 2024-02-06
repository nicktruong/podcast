interface YearMonth {
  year: number | string;
  month: number | string;
}

// month starts with 0
export const getNumberOfDaysInMonth = ({ year, month }: YearMonth) => {
  return new Date(+year, +month + 1, 0).getDate();
};

import { getNumberOfDaysInMonth } from "../date";

test("getNumberOfDaysInMonth util", () => {
  expect(getNumberOfDaysInMonth({ year: 2024, month: 1 })).toBe(29);
  expect(getNumberOfDaysInMonth({ year: 2024, month: 0 })).toBe(31);
});

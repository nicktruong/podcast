import { padZero, capFirstChar } from "../format";

test("padZero", () => {
  expect(padZero("9")).toBe("09");
  expect(padZero("2")).toBe("02");
  expect(padZero("32")).toBe("32");
  expect(padZero("322")).toBe("322");
});

test("capFirstChar", () => {
  expect(capFirstChar("the")).toBe("The");
  expect(capFirstChar("tHe")).toBe("THe");
  expect(capFirstChar("The")).toBe("The");
  expect(capFirstChar("the World")).toBe("The World");
});

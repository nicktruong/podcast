import { isDark } from "../color";

test("isDark util", () => {
  expect(isDark("#000000")).toBe(true);
  expect(isDark("#ffffff")).toBe(false);
});

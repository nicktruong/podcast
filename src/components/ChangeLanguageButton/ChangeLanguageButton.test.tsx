import { screen } from "@testing-library/react";

import { renderWithProviders } from "@/utils/test-utils";

import ChangeLanguageButton from "./ChangeLanguageButton";

test("renders ChangeLanguageButton", () => {
  renderWithProviders(<ChangeLanguageButton />);
  const img = screen.getByAltText(/American flag/i);
  expect(img).toBeInTheDocument();
});

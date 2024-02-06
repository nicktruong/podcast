import { screen } from "@testing-library/react";

import { renderWithProviders } from "@/utils/test-utils";

import StyledInput from "./StyledInput";

test("renders StyledInput", () => {
  renderWithProviders(
    <StyledInput error={false} placeholder="test" helperText="helper text" />
  );
  const input = screen.getByPlaceholderText(/test/i);
  expect(input).toBeInTheDocument();

  const helperText = screen.getByText(/helper text/i);
  expect(helperText).toBeInTheDocument();
});

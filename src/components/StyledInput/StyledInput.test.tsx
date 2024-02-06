import { render, screen } from "@testing-library/react";

import StyledInput from "./StyledInput";

test("renders StyledInput", () => {
  render(
    <StyledInput error={false} placeholder="test" helperText="helper text" />
  );
  const input = screen.getByPlaceholderText(/test/i);
  expect(input).toBeInTheDocument();

  const helperText = screen.getByText(/helper text/i);
  expect(helperText).toBeInTheDocument();
});

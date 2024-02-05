import { render, screen } from "@testing-library/react";

import LoadingButton from "./LoadingButton";

test("renders LoadingButton", () => {
  render(<LoadingButton loading={false}>Available</LoadingButton>);
  const text = screen.getByText(/Available/i);
  expect(text).toBeInTheDocument();

  const loadingIndicator = screen.queryByTestId("loadingIndicator");
  expect(loadingIndicator).not.toBeInTheDocument();
});

test("renders LoadingButton in loading state", () => {
  render(<LoadingButton loading={true}>Loading</LoadingButton>);
  const text = screen.getByText(/Loading/i);
  expect(text).toBeInTheDocument();

  const loadingIndicator = screen.getByTestId("loadingIndicator");
  expect(loadingIndicator).toBeInTheDocument();
});

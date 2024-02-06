import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import NotFound from "./404";

test("renders NotFound", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  const text = screen.getByText(/Page not found/i);
  expect(text).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /Home/i });
  expect(button).toBeInTheDocument();
});

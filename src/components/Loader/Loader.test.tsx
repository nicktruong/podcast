import { render, screen } from "@testing-library/react";

import Loader from "./Loader";

test("renders Loader", () => {
  render(<Loader />);
  const logo = screen.getByText(/GO Podcast/i);
  expect(logo).toBeInTheDocument();
});

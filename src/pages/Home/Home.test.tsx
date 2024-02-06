import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { store } from "@/store";

import Home from "./Home";

test("renders Home", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
});

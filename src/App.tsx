import React from "react";
import { ErrorBoundary } from "@sentry/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import router from "@/config/router";

import theme from "./theme";

import "./App.css";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <CssBaseline />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

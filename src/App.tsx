import { ErrorBoundary } from "@sentry/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import router from "@/config/router";

import theme from "./theme";

import "./App.css";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <CssBaseline />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

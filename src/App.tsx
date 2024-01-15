import { Suspense } from "react";
import { ErrorBoundary } from "@sentry/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { darkTheme } from "@/config/themes";
import router from "@/config/router";
import { store } from "@/store/store";

import "./App.css";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ThemeProvider theme={darkTheme}>
        <Suspense fallback={<p>Loading...</p>}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </Suspense>
        <CssBaseline />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

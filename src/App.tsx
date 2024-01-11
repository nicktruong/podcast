import { Suspense } from "react";
import { Provider } from "react-redux";
import { ErrorBoundary } from "@sentry/react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import router from "@/config/router";
import { store } from "@/store/store";
import { darkTheme } from "@/config/themes";
import AuthListener from "@/containers/auth-listener/AuthListener";

import "./App.css";

function App() {
  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ThemeProvider theme={darkTheme}>
        <Suspense fallback={<p>Loading...</p>}>
          <Provider store={store}>
            <AuthListener>
              <RouterProvider router={router} />
            </AuthListener>
          </Provider>
        </Suspense>
        <CssBaseline />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

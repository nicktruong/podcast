import { Suspense } from "react";
import { Provider } from "react-redux";
import { ErrorBoundary } from "@sentry/react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "@/store";
import { router, darkTheme } from "@/config";

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

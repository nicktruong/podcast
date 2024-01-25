import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "@/store";
import { router, darkTheme } from "@/config";

function App() {
  return (
    // as SentryErrorBoundary does not fallback correctly, we need to wrap another error boundary
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={<p>Loading...</p>}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Suspense>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

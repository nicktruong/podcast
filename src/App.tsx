import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "@/store";
import { darkTheme } from "@/config";
import { router } from "@/pages/router";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Suspense>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Suspense>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

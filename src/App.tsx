import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { store } from "@/store";
import { darkTheme } from "@/config";
import { router } from "@/pages/router";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

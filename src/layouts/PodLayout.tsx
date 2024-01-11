import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { podcasterDashboardTheme } from "@/config/themes";

export default function PodLayout() {
  return (
    <ThemeProvider theme={podcasterDashboardTheme}>
      <Outlet />
      <CssBaseline />
    </ThemeProvider>
  );
}

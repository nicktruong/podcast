import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import UserMenu from "@/containers/user-menu/UserMenu";

export default function RootLayout() {
  return (
    <Box sx={{ padding: "18px" }}>
      <Grid container spacing="8px">
        <Grid item xs={3.4}></Grid>
        <Grid item xs={8.6}>
          <UserMenu />
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}

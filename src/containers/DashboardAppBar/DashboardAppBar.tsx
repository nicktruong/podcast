import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, AppBar, Toolbar } from "@mui/material";

import { Logo } from "@/components";
import StyledDrawer from "@/containers/StyledDrawer";

import { usePrepareHook } from "./helpers";

import type { PodcasterDashboardAppBarProps } from "./interfaces";

export default function PodcasterDashboardAppBar({
  onOpenDialog,
}: PodcasterDashboardAppBarProps) {
  const { openDrawer, toggleDrawer } = usePrepareHook();

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={(theme) => ({
            width: "100%",
            margin: "0 auto",
            maxWidth: `${theme.breakpoints.values.lg + 80}px`,
          })}
        >
          <IconButton
            edge="end"
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: "12px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Logo />
          </Box>
        </Toolbar>
      </AppBar>

      <StyledDrawer
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        handleClickOpenEpisodeDialog={onOpenDialog}
      />
    </>
  );
}

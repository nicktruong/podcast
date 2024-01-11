import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, AppBar, Toolbar } from "@mui/material";

import Logo from "@/components/logo/Logo";
import StyledDrawer from "@/containers/drawer/StyledDrawer";

export default function PodAppbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key !== "Escape"
      ) {
        return;
      }

      setOpenDrawer(open);
    };

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

      <StyledDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </>
  );
}

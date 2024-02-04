import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components";
import { AudioPlayer, UserMenu } from "@/containers";

import { usePrepareHook } from "./helpers";

export default function RootLayout() {
  const { classes, elementRef, isAudioPlayerOpen } = usePrepareHook();

  return (
    <Box className={classes.rootLayout}>
      <Box className={classes.rootContent}>
        <Box className={classes.sidebar} component="nav">
          <SideBar />
        </Box>
        <Box ref={elementRef} className={classes.mainContent} component="main">
          <UserMenu />
          <Outlet />
        </Box>
      </Box>

      {isAudioPlayerOpen && <AudioPlayer />}
    </Box>
  );
}

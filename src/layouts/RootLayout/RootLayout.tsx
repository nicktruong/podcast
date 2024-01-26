import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components";
import { AudioPlayer, UserMenu } from "@/containers";

import { usePrepare } from "./usePrepare";

export default function RootLayout() {
  const { classes, elementRef, isAudioPlayerOpen } = usePrepare();

  return (
    <Box className={classes.rootLayout}>
      <Box className={classes.rootContent}>
        <Box className={classes.sidebar}>
          <SideBar />
        </Box>
        <Box ref={elementRef} className={classes.mainContent}>
          <UserMenu />
          <Outlet />
        </Box>
      </Box>

      {isAudioPlayerOpen && <AudioPlayer />}
    </Box>
  );
}

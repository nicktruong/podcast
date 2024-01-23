import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components";
import AudioPlayer from "@/containers/AudioPlayer";
import UserMenu from "@/containers/UserMenu/UserMenu";

import { usePrepare } from "./usePrepare";

export default function RootLayout() {
  const { classes, isAudioPlayerOpen } = usePrepare();

  return (
    <Box className={classes.rootLayout}>
      <Box className={classes.rootContent}>
        <Box className={classes.sidebar}>
          <SideBar />
        </Box>
        <Box className={classes.mainContent}>
          <UserMenu />
          <Outlet />
        </Box>
      </Box>

      {isAudioPlayerOpen && <AudioPlayer />}
    </Box>
  );
}

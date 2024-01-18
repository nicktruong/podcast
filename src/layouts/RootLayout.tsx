import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { selectUIState } from "@/store/ui/";
import { SideBar } from "@/components/SideBar";
import AudioPlayer from "@/containers/AudioPlayer";
import { useAppSelector } from "@/hooks/storeHooks";
import UserMenu from "@/containers/user-menu/UserMenu";
import { isSmallScreen } from "@/common/utils/media-query";

export default function RootLayout() {
  const smallScreen = isSmallScreen();
  const { isAudioPlayerOpen, sidebarExpand } = useAppSelector(selectUIState);

  return (
    <Box overflow="hidden">
      <Box
        gap="8px"
        padding="8px"
        display="flex"
        height={`calc(100vh - ${isAudioPlayerOpen ? 80 : 0}px)`}
      >
        {!smallScreen && (
          <Box width={sidebarExpand ? "358px" : "53px"}>
            <SideBar />
          </Box>
        )}
        <Box
          width="100%"
          height="100%"
          display="flex"
          overflow="auto"
          position="relative"
          flexDirection="column"
        >
          <UserMenu />
          <Outlet />
        </Box>
      </Box>

      {isAudioPlayerOpen && <AudioPlayer />}
    </Box>
  );
}

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components";
import { selectUIState } from "@/store/ui/";
import { useAppSelector } from "@/hooks/redux";
import { useSmallScreen } from "@/common/utils";
import AudioPlayer from "@/containers/AudioPlayer";
import UserMenu from "@/containers/UserMenu/UserMenu";

export default function RootLayout() {
  const { isSmallScreen } = useSmallScreen();
  const { isAudioPlayerOpen, sidebarExpand } = useAppSelector(selectUIState);

  return (
    <Box overflow="hidden">
      <Box
        gap="8px"
        padding="8px"
        display="flex"
        height={`calc(100vh - ${isAudioPlayerOpen ? 80 : 0}px)`}
      >
        {!isSmallScreen && (
          <Box flexShrink={0} width={sidebarExpand ? "358px" : "53px"}>
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

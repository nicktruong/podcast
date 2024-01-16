import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideBar } from "@/components/SideBar";
import UserMenu from "@/containers/user-menu/UserMenu";
import { useAppSelector } from "@/hooks/storeHooks";
import { selectSidebarExpandState } from "@/store/sidebarSlice";
import { isSmallScreen } from "@/common/utils/media-query";

export default function RootLayout() {
  const sidebarExpand = useAppSelector(selectSidebarExpandState);
  const smallScreen = isSmallScreen();

  return (
    <Box padding="8px" height="calc(100vh - 72px)" display="flex" gap="8px">
      {!smallScreen && (
        <Box width={sidebarExpand ? "358px" : "53px"}>
          <SideBar />
        </Box>
      )}
      <Box
        width="100%"
        height="100%"
        overflow="auto"
        display="flex"
        position="relative"
        flexDirection="column"
      >
        <UserMenu />
        <Outlet />
      </Box>
    </Box>
  );
}

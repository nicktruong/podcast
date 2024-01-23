import { selectUIState } from "@/store/ui/";
import { useAppSelector } from "@/hooks/redux";
import { useSmallScreen } from "@/common/utils";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { isSmallScreen } = useSmallScreen();

  const { isAudioPlayerOpen, isSidebarExpand } = useAppSelector(selectUIState);

  // TODO: add framer motion
  const contentHeight = isAudioPlayerOpen ? "calc(100vh - 80px)" : "100vh";

  const sidebarWidth = isSidebarExpand ? "358px" : "fit-content";

  const sidebarDisplay = isSmallScreen ? "none" : "block";

  const { classes } = useStyles({
    contentHeight,
    sidebarWidth,
    sidebarDisplay,
  });

  return { classes, isAudioPlayerOpen };
};

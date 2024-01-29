import { useTheme } from "@mui/material";

import { selectUIState } from "@/store/ui/";
import { useAppSelector } from "@/hooks/redux";
import { useScrollTop } from "@/hooks/scrollTop";
import { useMaxWidthScreenMedia } from "@/common/utils";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const theme = useTheme();

  const { elementRef } = useScrollTop();

  const { isSmaller } = useMaxWidthScreenMedia(theme.breakpoints.values.md);

  const { isAudioPlayerOpen, isSidebarExpand } = useAppSelector(selectUIState);

  // TODO: add framer motion
  const contentHeight = isAudioPlayerOpen ? "calc(100vh - 80px)" : "100vh";

  const sidebarWidth = isSidebarExpand ? "358px" : "78px";

  const sidebarDisplay = isSmaller ? "none" : "block";

  const { classes } = useStyles({
    sidebarWidth,
    contentHeight,
    sidebarDisplay,
  });

  return { classes, elementRef, isAudioPlayerOpen };
};

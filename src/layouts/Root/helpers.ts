import { useTheme } from "@mui/material";

import { selectUIState } from "@/store/ui/";
import { useAppSelector, useScrollTop } from "@/hooks";
import { useMaxWidthScreenMedia } from "@/common/utils";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const theme = useTheme();
  const { elementRef } = useScrollTop();
  const { isSmaller } = useMaxWidthScreenMedia(theme.breakpoints.values.md);
  const { isAudioPlayerOpen, isSidebarExpand } = useAppSelector(selectUIState);

  // TODO: add framer motion
  let sidebarWidth = "";

  if (isSidebarExpand) {
    if (isSmaller) sidebarWidth = "100%";
    else sidebarWidth = "358px";
  } else {
    if (isSmaller) sidebarWidth = "0px";
    else sidebarWidth = "78px";
  }

  const contentHeight = isAudioPlayerOpen ? "calc(100vh - 80px)" : "100vh";

  const { classes } = useStyles({
    sidebarWidth,
    contentHeight,
  });

  return { classes, elementRef, isAudioPlayerOpen };
};

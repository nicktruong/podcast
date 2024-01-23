import { tss } from "tss-react/mui";

import type { StyleParams } from "./interfaces";

export const useStyles = tss
  .withParams<StyleParams>()
  .create(({ contentHeight, sidebarWidth, sidebarDisplay }) => ({
    rootLayout: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
    rootContent: {
      gap: "8px",
      padding: "8px",
      display: "flex",
      height: contentHeight,
    },
    sidebar: {
      flexShrink: 0,
      width: sidebarWidth,
      display: sidebarDisplay,
    },
    mainContent: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      overflow: "auto",
      borderRadius: "8px",
      position: "relative",
      flexDirection: "column",
    },
  }));

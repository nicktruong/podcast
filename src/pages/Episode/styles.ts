import { tss } from "tss-react/mui";

export const useStyles = tss
  .withNestedSelectors()
  .create(({ classes, theme }) => ({
    episodeContent: {
      padding: "40px 0",
    },
    date: {
      fontSize: "14px",
      color: theme.palette.text.secondary,
    },
    tabContent: {
      maxWidth: "672px",
      margin: "16px 0 24px",
      color: theme.palette.text.secondary,
    },
    playIcon: {
      fontSize: "64px",
      cursor: "pointer",
      color: theme.palette.primary.main,
    },
    moreIcon: {
      fontSize: "32px",
      color: theme.palette.text.secondary,
    },
    actions: {
      gap: "8px",
      display: "flex",
      marginTop: "16px",
      alignItems: "center",
    },
    actionMenu: {
      padding: "4px",
    },
    nestedMenuParent: {
      overflow: "visible",
    },
    actionMenuItem: {
      borderRadius: "2px",
      position: "relative",
      padding: "12px 8px 12px 12px",

      "&:hover": {
        [`& .${classes.nestedMenu}`]: {
          opacity: 1,
          transform: "scale(1)",
          visibility: "visible",
          transition:
            "opacity 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 141ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    actionMenuItemContent: {
      gap: "8px",
      display: "flex",
      minWidth: "230px",
      alignItems: "center",
    },
    actionMenuItemIcon: {
      color: theme.palette.text.secondary,
    },
    actionMenuItemText: {
      fontSize: "14px",
    },
    actionMenuItemEndIcon: {
      marginLeft: "auto",
    },
    nestedMenu: {
      top: "0px",
      opacity: 0,
      padding: "4px",
      maxWidth: "320px",
      left: "calc(100%)",
      borderRadius: "4px",
      position: "absolute",
      visibility: "hidden",
      backgroundColor: theme.palette.custom?.background.nestedMenu,
      transform: "scale(0.75, 0.5625)",
      boxShadow: "rgba(0, 0, 0, 0.7) 0px 10px 30px",
      transition:
        "opacity 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 141ms cubic-bezier(0.4, 0, 0.2, 1) 70ms, visibility 211ms",
    },
    nestedMenuItem: {
      gap: "8px",
      display: "flex",
      padding: "12px",
      fontSize: "14px",
      borderRadius: "4px",
      alignItems: "center",

      "&:hover": {
        backgroundColor: theme.palette.custom?.background.search,
      },
    },
    nestedMenuItemIcon: {
      fontSize: "20px",
      color: theme.palette.text.secondary,
    },
    nestedMenuItemText: {
      fontSize: "14px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    seeAllEpisodesBtn: {
      marginTop: "32px",
    },
  }));

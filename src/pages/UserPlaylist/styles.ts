import { tss } from "tss-react/mui";

export const useStyles = tss
  .withNestedSelectors()
  .create(({ classes, theme }) => ({
    content: {
      marginTop: "24px",
    },
    removePlaylistBtn: {
      marginBottom: "24px",
    },
    playColumnHeader: {
      paddingLeft: "24px",
      paddingRight: "0px",
    },
    playColumn: {
      width: "40px",
      cursor: "pointer",
      paddingRight: "0px",

      "&:hover": {
        [`& .${classes.podcastIcon}`]: {
          display: "none",
        },
        [`& .${classes.playIcon}`]: {
          display: "inline-block",
        },
      },
    },
    activeColor: {
      color: theme.palette.primary.main,
    },
    podcastIcon: {
      marginLeft: "4px",
      display: "inline-block",
    },
    playIcon: {
      display: "none",
    },
    icon: {
      fontSize: "16px",
    },
    titleContainer: {
      gap: "12px",
      display: "flex",
      maxWidth: "320px",
      alignItems: "center",
    },
    img: {
      borderRadius: "4px",
    },
    titleCell: {
      maxWidth: "320px",
    },
    titleContent: {
      maxWidth: "320px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    title: {
      maxWidth: "100%",
      fontSize: "16px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      color: theme.palette.common.white,

      "&:hover": {
        textDecoration: "underline",
      },
    },
    author: {
      fontSize: "14px",
      color: theme.palette.text.secondary,
    },
    podcastCell: {
      maxWidth: "320px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    podcastContainer: {
      maxWidth: "320px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    podcastTitle: {
      fontSize: "14px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));

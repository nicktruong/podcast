import { tss } from "tss-react/mui";

export const useStyles = tss
  .withNestedSelectors()
  .create(({ classes, theme }) => ({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    section: {
      padding: "8px 12px",
      borderRadius: "8px",
      backgroundColor: theme.palette.custom?.background.main,

      "&:not(:first-of-type)": {
        marginTop: "8px",
      },
    },
    library: {
      flexGrow: 1,
    },
    button: {
      gap: "20px",
      padding: "4px 12px",
      borderRadius: "8px",
    },
    listItemIcon: {
      minWidth: "fit-content",
    },
    active: {
      color: theme.palette.common.white,
      "& .MuiTypography-root": {
        color: theme.palette.common.white,
      },
    },
    icon: {
      height: "40px",
      display: "flex",
      fontSize: "28px",
      minWidth: "unset",
      alignItems: "center",
      transition: "0.2s ease-out",
      color: theme.palette.text.secondary,
    },
    listItemText: {
      margin: "0px",
      height: "40px",
      display: "flex",
      alignItems: "center",

      "& .MuiTypography-root": {
        fontWeight: 700,
        color: theme.palette.text.secondary,
      },
    },
    libraryHeading: {
      gap: "20px",
      height: "40px",
      display: "flex",
      cursor: "pointer",
      padding: "4px 12px",
      borderRadius: "8px",
      alignItems: "center",

      "&:hover": {
        [`.${classes.icon}`]: {
          color: theme.palette.common.white,
        },
        [`.${classes.text}`]: {
          color: theme.palette.common.white,
        },
      },
    },
    text: {
      display: "flex",
      fontWeight: 700,
      alignItems: "center",
      transition: "0.2s ease-out",
      color: theme.palette.text.secondary,
    },
    podcastContainer: {
      gap: "8px",
      padding: "8px",
      display: "flex",
      maxWidth: "100%",
      marginTop: "8px",
      cursor: "pointer",
      borderRadius: "8px",

      "&:hover": {
        backgroundColor: theme.palette.custom?.background.nestedMenu,
      },
    },
    podcastImgContainer: {
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "4px",
    },
    podcastImg: {
      objectFit: "cover",
    },
    playlistInfo: {
      overflow: "hidden",
    },
    podcastTitle: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    playlistAuthor: {
      fontSize: "14px",
      color: theme.palette.text.secondary,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  }));

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
    iconButtonContainer: {
      textAlign: "right",
    },
    sidebarToggler: {
      width: "32px",
      height: "32px",
      color: theme.palette.text.secondary,
    },
    library: {
      flexGrow: 1,
    },
    logo: {
      padding: "12px",
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
      marginRight: "2px",
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

      "& .MuiTypography-root": {
        fontWeight: 700,
        color: theme.palette.text.secondary,
      },
    },
    libraryHeading: {
      gap: "20px",
      display: "flex",
      cursor: "pointer",
      padding: "4px 12px",
      borderRadius: "8px",
      alignItems: "center",

      "&:hover": {
        [`.${classes.icon}`]: {
          color: theme.palette.common.white,
        },
        [`.${classes.libraryTitle}`]: {
          color: theme.palette.common.white,
        },
      },
    },
    libraryTitle: {
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
      width: "100%",
      flexShrink: 0,
      maxWidth: "48px",
      overflow: "hidden",
      borderRadius: "4px",
    },
    podcastImg: {
      maxWidth: "100%",
      aspectRatio: "1/1",
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
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      color: theme.palette.text.secondary,
    },
  }));

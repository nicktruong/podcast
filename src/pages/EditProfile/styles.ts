import { alpha } from "@mui/material";
import { tss } from "tss-react/mui";

export const useStyles = tss
  .withNestedSelectors()
  .create(({ classes, theme }) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      borderRadius: "8px",
      background: theme.palette.custom?.background.gradient,
    },
    content: {
      padding: "72px 24px",
    },
    avatarContainer: {
      width: "180px",
      height: "180px",
      display: "flex",
      overflow: "hidden",
      borderRadius: "50%",
      alignItems: "center",
      margin: "64px auto 0",
      position: "relative",
      justifyContent: "center",
      boxShadow: theme.shadows[20],
      "&:hover": {
        [`& .${classes.overlay}`]: {
          display: "flex",
        },
      },
    },
    avatar: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    avatarIcon: {
      fontSize: "96px",
      color: theme.palette.text.secondary,
    },
    overlay: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "none",
      cursor: "pointer",
      borderRadius: "50%",
      position: "absolute",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: alpha(theme.palette.common.black, 0.8),
    },
    text: {
      marginTop: "32px",
      whiteSpace: "nowrap",
    },
    editIcon: {
      fontSize: "64px",
      marginTop: "8px",
    },
    form: {
      margin: "0 auto",
      maxWidth: "400px",
    },
    input: {},
  }));

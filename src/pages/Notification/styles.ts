import { alpha } from "@mui/material";
import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  notificationRoot: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: theme.palette.custom?.background.gradient,
  },
  notificationContent: {
    margin: "0 auto",
    padding: "72px 24px",
    maxWidth: theme.breakpoints.values.sm,
  },
  notificationHeading: {
    fontWeight: 700,
    fontSize: "24px",
    padding: "8px 16px",
  },
  notifications: {},
  notification: {
    borderTop: `1px solid ${alpha(
      theme.palette.custom?.grey.darker ?? "",
      0.2
    )}`,
    gap: "12px",
    display: "flex",
    padding: "8px 16px",
    alignItems: "center",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  notificationTitle: {},
  time: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
}));

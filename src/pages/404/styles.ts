import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  notFoundRoot: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  notFoundHeading: {
    fontWeight: 700,
    fontSize: "48px",
  },
  notFoundReason: {
    marginTop: "16px",
    color: theme.palette.text.secondary,
  },
  homeBtn: {
    fontWeight: 700,
    fontSize: "16px",
    marginTop: "32px",
    lineHeight: "20px",
    padding: "14px 32px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,

    "&:hover": {
      backgroundColor: theme.palette.common.white,
      transform: "scale(1.05)",
    },
  },
}));

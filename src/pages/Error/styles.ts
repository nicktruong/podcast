import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  errorRoot: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  errorIcon: {
    fontSize: "120px",
    color: theme.palette.text.secondary,
  },
  actions: {
    display: "flex",
    marginTop: "24px",
    alignItems: "center",
  },
  resetBtn: {
    marginTop: "2px",
  },
}));

import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  logoContainer: {
    display: "flex",
    columnGap: "2px",
    fontSize: "1.25rem",
    alignItems: "center",
    lineHeight: "1.75rem",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    letterSpacing: "-0.05em",
  },
});

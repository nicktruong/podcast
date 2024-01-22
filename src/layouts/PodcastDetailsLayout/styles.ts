import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  root: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: "linear-gradient(to bottom, #222222, #121212)",
  },
  content: {
    padding: "72px 24px",
  },
});

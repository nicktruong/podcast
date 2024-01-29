import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: theme.palette.custom?.background.gradient,
  },
  content: {
    padding: "72px 24px",
  },
}));

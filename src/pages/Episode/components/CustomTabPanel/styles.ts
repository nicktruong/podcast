import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  tabContent: {
    maxWidth: "672px",
    margin: "16px 0 24px",
    color: theme.palette.text.secondary,
  },
}));

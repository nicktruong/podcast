import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  homeRoot: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: theme.palette.custom?.background.gradient,
  },
  homeContent: {
    padding: "72px 24px",
  },
  section: {
    marginTop: "56px",
  },
}));

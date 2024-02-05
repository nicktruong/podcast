import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  headerRoot: {
    gap: "24px",
    display: "flex",
  },
  seriesCoverContainer: {
    flexShrink: 0,
  },
  seriesInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

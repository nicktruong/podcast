import { tss } from "tss-react";

export const useStyles = tss.create({
  headerRoot: {
    display: "flex",
    gap: "24px",
  },
  seriesCoverContainer: {
    flexShrink: 0,
  },
  seriesInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

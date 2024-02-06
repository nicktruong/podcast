import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  headerRoot: {
    gap: "24px",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  seriesCoverContainer: {
    flexShrink: 0,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  seriesInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  titleContainer: {
    height: "120px",

    [theme.breakpoints.down("sm")]: {
      height: "60px",
    },
  },
  title: {
    lineHeight: "120%",
  },
  author: {
    marginTop: "16px",
  },
}));

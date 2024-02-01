import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  series: {
    padding: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s ease-in",
    background: theme.palette.custom?.background.main,

    "&:hover": {
      background: theme.palette.custom?.hover.cardBackground,
    },
  },
  seriesImg: {
    width: "100%",
    // aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "4px",
  },
  seriesInfo: {
    marginTop: "16px",
  },
  seriesTitle: {
    fontWeight: 700,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  seriesAuthor: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

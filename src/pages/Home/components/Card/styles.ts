import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  podcast: {
    height: "100%",
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
    aspectRatio: "1/1",
    objectFit: "cover",
    borderRadius: "4px",
  },
  seriesInfo: {
    marginTop: "16px",
  },
  seriesTitle: {
    fontWeight: 600,
    fontSize: "20px",
    marginTop: "12px",
    lineHeight: "140%",
    overflow: "hidden",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
  },
  createdAt: {
    fontSize: "14px",
    marginTop: "12px",
    color: theme.palette.text.secondary,
  },
  categoryBtn: {
    fontSize: "14px",
    marginTop: "4px",
    lineHeight: "14px",
    padding: "8px 16px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
}));

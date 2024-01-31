import { tss } from "tss-react/mui";
import { alpha } from "@mui/material";

export const useStyles = tss.withNestedSelectors().create(({ theme }) => ({
  actions: {
    marginTop: "32px",
  },
  followBtn: {
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "14px",
    padding: "8px 16px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.common.white,
    borderColor: alpha(theme.palette.common.white, 0.5),

    "&:hover": {
      borderColor: theme.palette.common.white,
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
  },
  episode: {
    padding: "16px",
    borderRadius: "4px",
    borderTop: `1px solid ${theme.palette.custom?.hover.cardBackground}`,

    "&:first-of-type": {
      marginTop: "16px",
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
  },
  episodeTitle: {
    marginTop: "4px",
    fontWeight: 700,
  },
  podcastName: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  episodeDescription: {
    marginTop: "8px",
    fontSize: "14px",
    WebkitLineClamp: 2,
    overflow: "hidden",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    color: theme.palette.text.secondary,
  },
  playbar: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
  },
  playbarMainActions: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "40px",
    cursor: "pointer",
  },
  info: {
    display: "flex",
    marginLeft: "24px",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  date: {
    fontSize: "14px",
  },
  dot: {
    margin: "0px 8px",
  },
  timeleft: {
    fontSize: "14px",
  },
  timeline: {
    width: "85px",
    marginLeft: "8px",
    borderRadius: "200px",
  },
  playlistMain: {
    gap: "4%",
    display: "flex",
  },
  episodes: {
    width: "calc(100% / 2 * 3)",
  },
  episodesHeading: {
    fontWeight: 700,
    fontSize: "24px",
    marginTop: "16px",
  },
  about: {
    flexShrink: 0,
    width: "calc(100% / 3)",
  },
  aboutHeading: {
    fontSize: "24px",
    fontWeight: 700,
  },
  aboutDetail: {
    fontSize: "16px",
    lineHeight: "20px",
    color: theme.palette.text.secondary,
  },
  ratingBtn: {
    fontWeight: 700,
    fontSize: "14px",
    marginTop: "24px",
    lineHeight: "14px",
    padding: "8px 16px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.common.white,
    borderColor: alpha(theme.palette.common.white, 0),
    backgroundColor: alpha(theme.palette.common.white, 0.07),
    "&:hover": {
      borderColor: alpha(theme.palette.common.white, 0),
      backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
  },
  categoryBtn: {
    fontSize: "14px",
    marginTop: "24px",
    lineHeight: "14px",
    padding: "8px 16px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
  ratingBtnIcon: {
    fontSize: "16px",
  },
  rateCount: {
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
}));

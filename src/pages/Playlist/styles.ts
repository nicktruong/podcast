import { alpha } from "@mui/material";
import { tss } from "tss-react/mui";

export const useStyles = tss.withNestedSelectors().create(({ theme }) => ({
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
  actions: {
    gap: "16px",
    display: "flex",
    marginTop: "32px",
    alignItems: "center",
  },
  episode: {
    padding: "16px",
    marginTop: "16px",
    borderRadius: "4px",
    borderTop: `1px solid ${theme.palette.custom?.hover.cardBackground}`,
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
  },
  continueEpisode: {
    backgroundColor: alpha(theme.palette.common.white, 0.07),
  },
  continueListeningEpLabel: {
    color: theme.palette.text.secondary,
  },
  episodeTitle: {
    marginTop: "4px",
    fontWeight: 700,
  },
  seriesName: {
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
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
  },
  playbarMainActions: {
    display: "flex",
    flexGrow: 1,
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
    borderRadius: "200px",
    marginLeft: "8px",
  },
  iconSecondary: {
    fontSize: "32px",
    cursor: "pointer",
    color: theme.palette.text.secondary,
  },
  playlistMain: {
    display: "flex",
    gap: "4%",
  },
  episodes: {
    width: "calc(100% / 2 * 3)",
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
    borderColor: alpha(theme.palette.common.white, 0),
    backgroundColor: alpha(theme.palette.common.white, 0.07),
    "&:hover": {
      borderColor: alpha(theme.palette.common.white, 0),
      backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
  },
  ratingBtnIcon: {
    fontSize: "16px",
  },
  rateCount: {
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
  allEpisodes: {
    fontWeight: 700,
    fontSize: "24px",
    marginTop: "16px",
  },
}));

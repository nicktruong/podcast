import { tss } from "tss-react/mui";

export const useStyles = tss.withNestedSelectors().create(({ theme }) => ({
  followBtn: {
    fontWeight: 700,
    color: "#ffffff",
    fontSize: "14px",
    lineHeight: "14px",
    padding: "8px 16px",
    borderRadius: "200px",
    borderColor: "rgba(255, 255, 255, 0.5)",
    textTransform: "capitalize",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 1)",
    },
  },
  actions: {
    gap: "16px",
    display: "flex",
    marginTop: "32px",
    alignItems: "center",
  },
  episode: {
    borderTop: "1px solid #2a2a2a",
    marginTop: "16px",
    borderRadius: "4px",
    padding: "16px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  continueEpisode: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
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
    color: theme.palette.text.secondary,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
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
    color: theme.palette.text.secondary,
    alignItems: "center",
    marginLeft: "24px",
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
    borderRadius: "200px",
    color: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "14px",
    padding: "8px 16px",
    marginTop: "24px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0)",
    },
  },
  categoryBtn: {
    borderRadius: "200px",
    color: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    textTransform: "capitalize",
    fontSize: "14px",
    lineHeight: "14px",
    padding: "8px 16px",
    marginTop: "24px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0)",
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
    fontSize: "24px",
    marginTop: "16px",
    fontWeight: 700,
  },
}));

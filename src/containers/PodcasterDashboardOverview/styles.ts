import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  root: {
    margin: "0 auto",
    padding: "40px 16px",
    maxWidth: `${theme.breakpoints.values.lg + 80}px`,
  },
  podcastInfoContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  podcastInfoImgContainer: {
    display: "flex",
    justifyContent: "center",
  },
  podcastInfoImg: {
    width: "280px",
    height: "280px",
    borderRadius: "4px",

    [theme.breakpoints.up("md")]: {
      width: "200px",
      height: "200px",
    },
  },
  podcastInfo: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "32px",
    },
  },
  podcast: {
    marginTop: "32px",

    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
  },
  podcastHeading: {
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
  },
  podcastTitle: {
    fontWeight: 700,
    marginTop: "8px",
    fontSize: "32px",
    lineHeight: "32px",
  },
  episodesCount: {
    fontWeight: 700,
    fontSize: "14px",
    marginTop: "8px",
    color: theme.palette.text.secondary,
  },
  podcastOverviewContainer: {
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      columnGap: "32px",
    },
  },
  podcastOverview: {
    marginTop: "64px",
    [theme.breakpoints.up("lg")]: {
      flexGrow: 4,
    },
  },
  podcastOverviewHeading: {
    fontWeight: 700,
    fontSize: "18px",
  },
  podcastOverviewStats: {
    rowGap: "48px",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "8px",
    borderRadius: "4px",
    padding: "32px 24px",
    border: `1px solid ${theme.palette.custom?.grey.light}`,
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      height: "162px",
    },
  },
  statsHeading: {
    fontWeight: 700,
    fontSize: "13px",
  },
  stats: {
    fontWeight: 700,
    fontSize: "32px",
  },
  statsNote: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
  },
  latestEpisodeContainer: {
    marginTop: "48px",

    [theme.breakpoints.up("lg")]: {
      marginTop: "64px",
      maxWidth: "307px",
    },
  },
  latestEpisode: {
    display: "flex",
    marginTop: "8px",
    minWidth: "307px",
    borderRadius: "4px",
    padding: "32px 24px",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.custom?.grey.light}`,
  },
  latestEpisodeTitle: {
    fontSize: "11px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.text.secondary,
  },
  latestEpisodeImgContainer: {
    width: "96px",
    flexShrink: 0,
    height: "96px",
  },
}));

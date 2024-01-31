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
  standoutPodcastContainer: {
    display: "flex",
    marginTop: "24px",
    gap: "clamp(2rem, 4%, 4rem)",
  },
  standoutPodcastHeading: {
    fontWeight: 700,
    fontSize: "32px",
    marginTop: "16px",
    lineHeight: "140%",
  },
  standoutPodcastHeadingSkeleton: {
    width: "275px",
    height: "45px",
    marginTop: "16px",
  },
  standoutPodcast: {
    // padding: "16px",
    width: "34%",
    marginTop: "16px",
    // aspectRatio: "1/1",
    overflow: "hidden",
    borderRadius: "8px",
    // background: lighten(theme.palette.custom?.background.main ?? "", 0.08),
  },
  standoutPodcastImg: {
    width: "100%",
    objectFit: "cover",
    aspectRatio: "1/1",
    borderRadius: "32px",
  },
  standoutPodcastImgSkeleton: {
    width: "100%",
    height: "unset",
    aspectRatio: "1/1",
    borderRadius: "32px",
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
  categoryBtnSkeleton: {
    width: "150px",
    height: "30px",
    marginTop: "24px",
  },
  standoutPodcastTitle: {
    fontWeight: 700,
    fontSize: "24px",
    marginTop: "16px",
    lineHeight: "140%",
    overflow: "hidden",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  standoutPodcastTitleSkeleton: {
    width: "100%",
    height: "68px",
    marginTop: "16px",
  },
  standoutPodcastDesc: {
    marginTop: "4px",
    overflow: "hidden",
    WebkitLineClamp: 5,
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    color: theme.palette.text.secondary,
  },
  standoutPodcastDescSkeleton: {
    marginTop: "4px",
  },
  episodesContainer: {
    width: "66%",
  },
  episodes: {
    marginTop: "16px",
  },
  episode: {
    gap: "4%",
    display: "flex",
    borderRadius: "8px",
    alignItems: "flex-start",

    "&:not(:first-of-type)": {
      marginTop: "24px",
    },
  },
  episodeInfo: {
    width: "100%",
  },
  episodeCover: {
    flexShrink: 0,
    width: "184px",
    aspectRatio: "1/1",
    borderRadius: "8px",
  },
  episodeCoverSkeleton: {
    flexShrink: 0,
    width: "184px",
    height: "unset",
    aspectRatio: "1/1",
  },
  episodeCreatedAt: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  episodeCreatedAtSkeleton: {
    width: "106px",
    height: "21px",
  },
  episodeTitle: {
    fontSize: "18px",
    marginTop: "8px",
    display: "block",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  episodeTitleSkeleton: {
    width: "100%",
    height: "27px",
    marginTop: "8px",
  },
  episodeDesc: {
    marginTop: "8px",
    overflow: "hidden",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    color: theme.palette.text.secondary,
  },
  episodeDescSkeleton: {
    width: "100%",
    display: "block",

    "&:first-of-type": {
      marginTop: "8px",
    },
  },
  playIcon: {
    fontSize: "48px",
    marginTop: "4px",
    cursor: "pointer",
    marginLeft: "-3px",
  },
  playIconSkeleton: {
    width: "48px",
    height: "48px",
    marginTop: "4px",
  },
  section: {
    marginTop: "56px",
  },
}));

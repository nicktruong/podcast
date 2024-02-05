import { tss } from "tss-react/mui";

export const useStyles = tss.create({
  standoutPodcastContainer: {
    display: "flex",
    marginTop: "24px",
    gap: "clamp(2rem, 4%, 4rem)",
  },
  standoutPodcast: {
    width: "34%",
    marginTop: "16px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  standoutPodcastHeadingSkeleton: {
    width: "275px",
    height: "45px",
    marginTop: "16px",
  },
  standoutPodcastImgSkeleton: {
    width: "100%",
    height: "unset",
    aspectRatio: "1/1",
    borderRadius: "32px",
  },
  categoryBtnSkeleton: {
    width: "150px",
    height: "30px",
    marginTop: "24px",
  },
  standoutPodcastTitleSkeleton: {
    width: "100%",
    height: "68px",
    marginTop: "16px",
  },
  standoutPodcastDescSkeleton: {
    marginTop: "4px",
  },
  episodeCoverSkeleton: {
    flexShrink: 0,
    width: "184px",
    height: "unset",
    aspectRatio: "1/1",
  },
  episodeCreatedAtSkeleton: {
    width: "106px",
    height: "21px",
  },
  episodeTitleSkeleton: {
    width: "100%",
    height: "27px",
    marginTop: "8px",
  },
  episodeDescSkeleton: {
    width: "100%",
    display: "block",

    "&:first-of-type": {
      marginTop: "8px",
    },
  },
  playIconSkeleton: {
    width: "48px",
    height: "48px",
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
});

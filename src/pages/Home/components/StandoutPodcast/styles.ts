import { tss } from "tss-react/mui";

export const useStyles = tss.withParams<{ breakpoint: number }>().create(
  ({
    breakpoint,
    theme: {
      palette,
      breakpoints: {
        values: { sm, md },
      },
    },
  }) => ({
    flexWrap: {
      flexWrap: "wrap",
    },
    standoutPodcastContainer: {
      display: "flex",
      marginTop: "24px",
      gap: "clamp(2rem, 4%, 4rem)",
      flexWrap: breakpoint < md ? "wrap" : "unset",
    },
    standoutPodcastHeading: {
      fontWeight: 700,
      fontSize: "32px",
      marginTop: "16px",
      lineHeight: "140%",
    },
    standoutPodcast: {
      width: breakpoint < md ? "100%" : "34%",
      marginTop: "16px",
      overflow: "hidden",
      borderRadius: "8px",
    },
    standoutPodcastImg: {
      width: "100%",
      objectFit: "cover",
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
      color: palette.common.white,
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
    standoutPodcastDesc: {
      marginTop: "4px",
      overflow: "hidden",
      display: "-webkit-box",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      color: palette.text.secondary,
      WebkitLineClamp: breakpoint < md ? 3 : 5,
    },
    episodesContainer: {
      width: breakpoint < md ? "100%" : "66%",
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
      display: "flex",
      alignSelf: "stretch",
      flexDirection: "column",
    },
    episodeCover: {
      flexShrink: 0,
      aspectRatio: "1/1",
      borderRadius: "8px",
      width: breakpoint < md ? "clamp(104px, 20vw, 184px)" : "184px",
    },
    episodeCreatedAt: {
      fontSize: "14px",
      color: palette.text.secondary,
    },
    episodeTitle: {
      fontSize: "18px",
      marginTop: "8px",
      overflow: "hidden",
      WebkitLineClamp: 2,
      display: "-webkit-box",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",

      "&:hover": {
        textDecoration: "underline",
      },
    },
    episodeDesc: {
      marginTop: "8px",
      overflow: "hidden",
      WebkitLineClamp: 2,
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      color: palette.text.secondary,
      display: breakpoint < sm ? "none" : "-webkit-box",
    },
    playIconBtn: {
      alignSelf: "flex-start",
      marginTop: breakpoint < sm ? "auto" : "4px",
    },
    playIcon: {
      fontSize: "48px",
      marginLeft: "-3px",
    },
  })
);

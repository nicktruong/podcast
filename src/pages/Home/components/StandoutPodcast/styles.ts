import { tss } from "tss-react/mui";

export const useStyles = tss.withParams<{ sidebarWidth: number }>().create(
  ({
    sidebarWidth,
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
      flexWrap: "unset",
      marginTop: "24px",
      gap: "clamp(2rem, 4%, 4rem)",

      [`@media (max-width: ${md + sidebarWidth}px)`]: {
        flexWrap: "wrap",
      },
    },
    standoutPodcastHeading: {
      fontWeight: 700,
      fontSize: "32px",
      marginTop: "16px",
      lineHeight: "140%",
    },
    standoutPodcast: {
      width: "34%",
      marginTop: "16px",
      overflow: "hidden",
      borderRadius: "8px",

      [`@media (max-width: ${md + sidebarWidth}px)`]: {
        width: "100%",
      },
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
      WebkitLineClamp: 5,
      display: "-webkit-box",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      color: palette.text.secondary,

      [`@media (max-width: ${md + sidebarWidth}px)`]: {
        WebkitLineClamp: 3,
      },
    },
    episodesContainer: {
      width: "66%",

      [`@media (max-width: ${md + sidebarWidth}px)`]: {
        width: "100%",
      },
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
      width: "168px",
      aspectRatio: "1/1",
      borderRadius: "8px",

      [`@media (max-width: ${sm + sidebarWidth}px)`]: {
        width: "136px",
      },
    },
    episodeCreatedAt: {
      fontSize: "14px",
      color: palette.text.secondary,
    },
    episodeTitle: {
      marginTop: "8px",
      fontSize: "18px",
      overflow: "hidden",
      WebkitLineClamp: 2,
      display: "-webkit-box",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",

      [`@media (max-width: ${sm + sidebarWidth}px)`]: {
        fontSize: "16px",
      },

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
      display: "-webkit-box",

      [`@media (max-width: ${sm + sidebarWidth}px)`]: {
        display: "none",
      },
    },
    playIconBtn: {
      marginTop: "4px",
      alignSelf: "flex-start",
    },
    playIcon: {
      fontSize: "48px",
      marginLeft: "-3px",
    },
  })
);

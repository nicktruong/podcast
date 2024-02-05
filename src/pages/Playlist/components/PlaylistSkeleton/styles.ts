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
  followBtnSkeleton: {
    width: "80px",
    height: "32px",
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
  episodeTitle: {
    marginTop: "4px",
    fontWeight: 700,
  },
  episodeTitleSkeleton: {
    width: "360px",
    height: "24px",
    marginTop: "4px",
  },
  podcastName: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  podcastNameSkeleton: {
    width: "370px",
    height: "21px",
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
  episodeDescriptionSkeleton: {
    height: "42px",
    marginTop: "8px",
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
  iconSkeleton: {
    width: "40px",
    height: "40px",
  },
  info: {
    display: "flex",
    marginLeft: "24px",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  infoSkeleton: {
    width: "114px",
    height: "21px",
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
    marginLeft: "8px",
    borderRadius: "200px",
  },
  iconSecondary: {
    fontSize: "32px",
    cursor: "pointer",
    color: theme.palette.text.secondary,
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
  episodesHeadingSkeleton: {
    width: "136px",
    height: "36px",
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
  aboutHeadingSkeleton: {
    width: "80px",
    height: "36px",
  },
  aboutDetail: {
    fontSize: "16px",
    lineHeight: "20px",
    color: theme.palette.text.secondary,
  },
  aboutDetailSkeleton: {
    width: "120px",
    height: "20px",
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
  ratingBtnSkeleton: {
    width: "130px",
    height: "34px",
    marginTop: "24px",
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
  categoryBtnSkeleton: {
    width: "150px",
    height: "30px",
    marginTop: "24px",
  },
  ratingBtnIcon: {
    fontSize: "16px",
  },
  rateCount: {
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
}));

import { lighten } from "@mui/material";
import { tss } from "tss-react/mui";

// TODO: create global layout
export const useStyles = tss.create(({ theme }) => ({
  profileRoot: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "8px",
    background: "linear-gradient(to bottom, #222222, #121212)",
  },
  profileContent: {
    padding: "72px 24px",
  },
  headerRoot: {
    gap: "24px",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  seriesCoverContainer: {
    flexShrink: 0,
  },
  userAvatarContainer: {
    width: "232px",
    height: "232px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[20],
    backgroundColor: lighten(theme.palette.common.black, 0.07),
  },
  userAvatar: {
    width: "100%",
    height: "100%",
    maxWidth: "232px",
    maxHeight: "232px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  avatarIcon: {
    fontSize: "160px",
    color: theme.palette.text.secondary,
  },
  userInfo: {
    display: "flex",
    marginBottom: "32px",
    flexDirection: "column",
    justifyContent: "flex-end",

    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
    },
  },
  editAction: {
    gap: "8px",
    cursor: "pointer",
    marginTop: "24px",
    display: "inline-flex",
  },
  editIcon: {
    fontSize: "20px",
  },
  profile: {
    fontSize: "14px",
    marginLeft: "4px",
  },
  authorNameContainer: {
    height: "96px",

    [theme.breakpoints.down("sm")]: {
      height: "64px",
    },
  },
  username: {
    fontWeight: 700,
    lineHeight: "100%",
  },
  bio: {
    fontSize: "14px",
    marginLeft: "4px",
  },
  playlists: {
    marginTop: "32px",
  },
  playlistsHeading: {
    fontWeight: 700,
    fontSize: "24px",
  },
  playlist: {
    marginTop: "32px",
  },
  series: {
    padding: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    background: theme.palette.custom?.background.main,
    transition: "all 0.2s ease-in",

    "&:hover": {
      background: theme.palette.custom?.hover.cardBackground,
    },
  },
  seriesImg: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  seriesInfo: {
    marginTop: "16px",
  },
  seriesTitle: {
    fontWeight: 700,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  seriesAuthor: {
    fontSize: "14px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.text.secondary,
  },
}));

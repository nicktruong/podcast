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
    display: "flex",
    gap: "24px",
  },
  seriesCoverContainer: {
    flexShrink: 0,
  },
  userAvatarContainer: {
    width: "232px",
    height: "232px",
    borderRadius: "50%",
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
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  editAction: {
    gap: "8px",
    display: "flex",
    marginTop: "24px",
    cursor: "pointer",
  },
  editIcon: {
    fontSize: "20px",
  },
  profile: {
    fontSize: "14px",
    marginLeft: "4px",
  },
  username: {
    fontWeight: 700,
    fontSize: "96px",
    lineHeight: "96px",
    marginBottom: "32px",
  },
  playlists: {
    marginTop: "32px",
  },
  playlistsHeading: {
    fontWeight: 700,
    fontSize: "24px",
  },
  playlist: {
    gap: "24px",
    height: "233px",
    display: "grid",
    marginTop: "8px",
    overflow: "hidden",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
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
    color: theme.palette.text.secondary,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

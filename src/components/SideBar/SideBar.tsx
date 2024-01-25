import {
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import { routes } from "@/common/constants";

import usePrepare from "./usePrepare";

export default function SideBar() {
  const { cx, active, classes, playlists, isSidebarExpand } = usePrepare();

  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Link to={routes.index}>
          <ListItemButton className={classes.button}>
            <ListItemIcon className={classes.listItemIcon}>
              <HomeIcon className={cx(classes.icon, active[routes.index])} />
            </ListItemIcon>
            {isSidebarExpand && (
              <ListItemText
                className={cx(classes.listItemText, active[routes.index])}
                primary="Home"
              />
            )}
          </ListItemButton>
        </Link>

        <Link to={routes.search}>
          <ListItemButton className={classes.button}>
            <ListItemIcon className={classes.listItemIcon}>
              <SearchIcon className={cx(classes.icon, active[routes.search])} />
            </ListItemIcon>
            {isSidebarExpand && (
              <ListItemText
                className={cx(classes.listItemText, active[routes.search])}
                primary="Search"
              />
            )}
          </ListItemButton>
        </Link>
      </Box>

      <Box className={cx(classes.section, classes.library)}>
        <Box className={classes.libraryHeading}>
          <BookmarksIcon className={classes.icon} />
          {isSidebarExpand && (
            <Typography className={classes.text}>Your Library</Typography>
          )}
        </Box>

        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            className={classes.podcastContainer}
            to={routes.userPlaylist.replace(":id", playlist.id)}
          >
            <Box className={classes.podcastImgContainer}>
              <img
                className={classes.podcastImg}
                src={playlist.coverUrl}
                width={isSidebarExpand ? "48px" : "32px"}
                height={isSidebarExpand ? "48px" : "32px"}
                alt={`${playlist.title} cover photo`}
              />
            </Box>
            {isSidebarExpand && (
              <Box className={classes.playlistInfo}>
                <Typography className={classes.podcastTitle}>
                  {playlist.title}
                </Typography>
                <Typography className={classes.playlistAuthor}>
                  Playlist
                </Typography>
              </Box>
            )}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

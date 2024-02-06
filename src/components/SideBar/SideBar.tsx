import {
  Box,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RiSearchEyeFill, RiSearchEyeLine } from "react-icons/ri";

import { routes } from "@/constants";

import Logo from "../Logo";

import usePrepareHook from "./helpers";

export default function SideBar() {
  const { active, classes, playlists, isSidebarExpand, t, cx, toggleSidebar } =
    usePrepareHook();

  return (
    <Box className={classes.root}>
      <Box className={classes.section}>
        <Box className={classes.iconButtonContainer}>
          <IconButton onClick={toggleSidebar}>
            {isSidebarExpand ? (
              <ChevronLeftIcon className={classes.sidebarToggler} />
            ) : (
              <ChevronRightIcon className={classes.sidebarToggler} />
            )}
          </IconButton>
        </Box>

        <Link to={routes.index}>
          <Box className={classes.logo}>
            <Logo hideText={!isSidebarExpand} />
          </Box>
        </Link>

        <Link to={routes.index}>
          <ListItemButton className={classes.button}>
            <ListItemIcon className={classes.listItemIcon}>
              {active[routes.index] ? (
                <HomeIcon className={cx(classes.icon, classes.active)} />
              ) : (
                <MdOutlineHome className={classes.icon} />
              )}
            </ListItemIcon>
            {isSidebarExpand && (
              <ListItemText
                className={cx(classes.listItemText, {
                  [classes.active]: active[routes.index],
                })}
                primary={t("home")}
              />
            )}
          </ListItemButton>
        </Link>

        <Link to={routes.search}>
          <ListItemButton className={classes.button}>
            <ListItemIcon className={classes.listItemIcon}>
              {active[routes.search] ? (
                <RiSearchEyeFill className={cx(classes.icon, classes.active)} />
              ) : (
                <RiSearchEyeLine className={classes.icon} />
              )}
            </ListItemIcon>
            {isSidebarExpand && (
              <ListItemText
                className={cx(classes.listItemText, {
                  [classes.active]: active[routes.search],
                })}
                primary={t("search")}
              />
            )}
          </ListItemButton>
        </Link>
      </Box>

      <Box className={cx(classes.section, classes.library)}>
        <Box className={classes.libraryHeading}>
          <BookmarksIcon className={classes.icon} />
          {isSidebarExpand && (
            <Typography className={classes.libraryTitle}>
              {t("yourPlaylists")}
            </Typography>
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
                width="48px"
                height="48px"
                src={playlist.coverUrl}
                className={classes.podcastImg}
                alt={`${playlist.title} cover photo`}
              />
            </Box>
            {isSidebarExpand && (
              <Box className={classes.playlistInfo}>
                <Typography className={classes.podcastTitle}>
                  {playlist.title}
                </Typography>
                <Typography className={classes.playlistAuthor}>
                  {t("playlist")}
                </Typography>
              </Box>
            )}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

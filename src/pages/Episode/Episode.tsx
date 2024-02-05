import {
  Tab,
  Box,
  Tabs,
  Menu,
  Button,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { routes } from "@/common/constants";

import { CustomTabPanel } from "./components";
import { a11yProps, usePrepareHook } from "./helpers";

const Episode = () => {
  const {
    userId,
    classes,
    tabIndex,
    playlists,
    episodeDetail,
    podcastDetail,
    openActionMenu,
    audioIsPlaying,
    playingEpisodeId,
    actionMenuAnchorEl,
    handleTabChange,
    handlePauseAudio,
    handleAddToPlaylist,
    handleCreatePlaylist,
    handleActionMenuClose,
    handleActionMenuBtnClick,
    handleDownloadAndPlayAudio,
  } = usePrepareHook();

  return (
    <Box className={classes.episodeContent}>
      <Box>
        <Typography className={classes.date}>
          {format(new Date(episodeDetail?.createdAt ?? Date.now()), "MMM d y")}
        </Typography>
      </Box>

      <Box className={classes.actions}>
        <Box
          component="button"
          onClick={(event) => {
            event.stopPropagation();

            if (playingEpisodeId === episodeDetail?.id && audioIsPlaying) {
              handlePauseAudio();
            } else {
              handleDownloadAndPlayAudio({
                title: episodeDetail?.title ?? "",
                episodeId: episodeDetail?.id ?? "",
                pathToFile: episodeDetail?.pathToFile ?? "",
                podcastId: podcastDetail?.id ?? "",
                coverUrl: podcastDetail?.coverUrl ?? "",
                author: podcastDetail?.author.name ?? "",
              });
            }
          }}
        >
          {audioIsPlaying && playingEpisodeId === episodeDetail?.id ? (
            <PauseCircleIcon className={classes.playIcon} />
          ) : (
            <PlayCircleIcon className={classes.playIcon} />
          )}
        </Box>

        <Box>
          {userId && (
            <IconButton
              id="action-menu-btn"
              aria-haspopup="true"
              onClick={handleActionMenuBtnClick}
              aria-expanded={openActionMenu ? "true" : undefined}
              aria-controls={openActionMenu ? "action-menu" : undefined}
            >
              <MoreHorizIcon className={classes.moreIcon} />
            </IconButton>
          )}
          <Menu
            MenuListProps={{
              className: classes.actionMenu,
              "aria-labelledby": "action-menu-btn",
            }}
            slotProps={{
              paper: {
                className: classes.nestedMenuParent,
              },
            }}
            id="action-menu"
            open={openActionMenu}
            anchorEl={actionMenuAnchorEl}
            onClose={handleActionMenuClose}
          >
            <MenuItem className={classes.actionMenuItem}>
              {userId && (
                <Box>
                  <Box className={classes.actionMenuItemContent}>
                    <AddIcon className={classes.actionMenuItemIcon} />
                    <Typography className={classes.actionMenuItemText}>
                      Add to playlist
                    </Typography>
                    <ArrowRightIcon className={classes.actionMenuItemEndIcon} />
                  </Box>
                </Box>
              )}

              <Box className={classes.nestedMenu}>
                <Box
                  className={classes.nestedMenuItem}
                  onClick={handleCreatePlaylist}
                >
                  <AddIcon className={classes.nestedMenuItemIcon} />
                  <Typography className={classes.nestedMenuItemText}>
                    Create playlist
                  </Typography>
                </Box>
                {playlists.map((playlist) => (
                  <Box
                    key={playlist.id}
                    className={classes.nestedMenuItem}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    <Typography className={classes.nestedMenuItemText}>
                      {playlist.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Transcript" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIndex} index={0}>
        <Typography>{episodeDetail?.description}</Typography>
        <Button
          className={classes.seeAllEpisodesBtn}
          variant="roundedOutlined"
          component={Link}
          to={routes.playlist.replace(":id", podcastDetail?.id ?? "")}
        >
          See all episodes
        </Button>
      </CustomTabPanel>
    </Box>
  );
};

export default Episode;

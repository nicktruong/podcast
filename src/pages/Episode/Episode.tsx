import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { format } from "date-fns";
import {
  Box,
  Menu,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { usePrepare } from "./usePrepare";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  const { classes } = usePrepare();

  return (
    <div
      className={classes.tabContent}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Episode = () => {
  const {
    classes,
    tabIndex,
    playlists,
    episodeDetail,
    openActionMenu,
    actionMenuAnchorEl,
    handleTabChange,
    handleAddToPlaylist,
    handleCreatePlaylist,
    handleActionMenuClose,
    handleActionMenuBtnClick,
  } = usePrepare();

  return (
    <Box className={classes.episodeContent}>
      <Box>
        <Typography className={classes.date}>
          {format(new Date(episodeDetail?.createdAt ?? Date.now()), "MMM d y")}
        </Typography>
      </Box>

      <Box className={classes.actions}>
        <PlayCircleIcon className={classes.playIcon} />

        <Box>
          <IconButton
            id="action-menu-btn"
            aria-haspopup="true"
            onClick={handleActionMenuBtnClick}
            aria-expanded={openActionMenu ? "true" : undefined}
            aria-controls={openActionMenu ? "action-menu" : undefined}
          >
            <MoreHorizIcon className={classes.moreIcon} />
          </IconButton>
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
              <Box>
                <Box className={classes.actionMenuItemContent}>
                  <AddIcon className={classes.actionMenuItemIcon} />
                  <Typography className={classes.actionMenuItemText}>
                    Add to playlist
                  </Typography>
                  <ArrowRightIcon className={classes.actionMenuItemEndIcon} />
                </Box>
              </Box>

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
        {episodeDetail?.description}
      </CustomTabPanel>
    </Box>
  );
};

export default Episode;

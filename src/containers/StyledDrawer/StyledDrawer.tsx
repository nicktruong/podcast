import {
  Box,
  List,
  Drawer,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";

import { usePrepareHook } from "./helpers";

import type { StyledDrawerProps } from "./interfaces";

export default function StyledDrawer({
  openDrawer,
  toggleDrawer,
  handleClickOpenEpisodeDialog,
}: StyledDrawerProps) {
  const { t } = usePrepareHook();

  return (
    <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 285 }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Box
          sx={{
            textAlign: "right",
            marginTop: "4px",
            padding: "8px 16px 0",
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t("home")} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={(e) => {
                toggleDrawer(false)(e);
                handleClickOpenEpisodeDialog();
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={t("newEpisode")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

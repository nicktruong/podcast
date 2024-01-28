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

import { usePrepare } from "./usePrepare";

interface Props {
  openDrawer: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleClickOpenEpisodeDialog: () => void;
}

export default function StyledDrawer({
  openDrawer,
  toggleDrawer,
  handleClickOpenEpisodeDialog,
}: Props) {
  const { t } = usePrepare();

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
              onClick={() => {
                toggleDrawer(false);
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

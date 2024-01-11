import {
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  openDrawer: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function StyledDrawer({ openDrawer, toggleDrawer }: Props) {
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
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

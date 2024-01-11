import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import routes from "@/common/constants/routes";
import { Roles } from "@/common/constants/roles";

import useHelper from "./useHelper";

export default function UserMenu() {
  const {
    user,
    open,
    anchorEl,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  } = useHelper();

  if (!user.uid) {
    return null;
  }

  return (
    <AppBar
      component="nav"
      sx={{
        width: "70%",
        right: "8px",
        top: "8px",
        background: "transparent",
      }}
      elevation={0}
    >
      <Toolbar>
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton
            id="user-menu-button"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickOpenMenu}
          >
            <PersonIcon />
          </IconButton>

          <Menu
            id="user-menu"
            aria-labelledby="user-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            {user.roles.includes(Roles.podcaster) ? (
              <MenuItem onClick={handleCloseMenu}>
                <Link to={routes.podDashboard}>Go to Podcast Dashboard</Link>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleUpgradeToPodcasterRole}>
                Upgrade to Podcaster
              </MenuItem>
            )}
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

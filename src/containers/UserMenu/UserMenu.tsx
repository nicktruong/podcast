import {
  Box,
  Menu,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

import { Roles } from "@/common/enums";
import { routes } from "@/common/constants";

import useHelper from "./useHelper";

export default function UserMenu() {
  const {
    open,
    userId,
    classes,
    anchorEl,
    userRoles,
    isSmallScreen,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  } = useHelper();

  return (
    <AppBar elevation={0} component="nav" className={classes.appbarRoot}>
      <Toolbar>
        {!isSmallScreen && (
          <Box>
            <IconButton onClick={toggleSidebar}>
              <MenuIcon className={classes.sidebarToggler} />
            </IconButton>
          </Box>
        )}

        <Box sx={{ marginLeft: "auto" }}>
          {userId && (
            <>
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
                className={classes.mobileMenu}
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
                {userRoles.includes(Roles.PODCASTER) ? (
                  <Link to={routes.podDashboard}>
                    <MenuItem onClick={handleCloseMenu}>
                      Go to Podcast Dashboard
                    </MenuItem>
                  </Link>
                ) : (
                  <MenuItem onClick={handleUpgradeToPodcasterRole}>
                    Upgrade to Podcaster
                  </MenuItem>
                )}
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
          {!userId &&
            (isSmallScreen ? (
              <>
                <IconButton
                  id="user-menu-button"
                  aria-controls={open ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickOpenMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  className={classes.mobileMenu}
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
                  <Link to={routes.signup}>
                    <MenuItem onClick={handleCloseMenu}>Sign up</MenuItem>
                  </Link>
                  <Link to={routes.login}>
                    <MenuItem onClick={handleCloseMenu}>Log in</MenuItem>
                  </Link>
                </Menu>
              </>
            ) : (
              <Box>
                <Link to={routes.signup}>
                  <Button className={classes.signUpBtn}>Sign up</Button>
                </Link>
                <Link to={routes.login}>
                  <Button className={classes.loginBtn} variant="contained">
                    Log in
                  </Button>
                </Link>
              </Box>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

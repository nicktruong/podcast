import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

import routes from "@/common/constants/routes";
import { Roles } from "@/common/constants/roles";

import useHelper from "./useHelper";

export default function UserMenu() {
  const {
    user,
    open,
    classes,
    anchorEl,
    smallScreen,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  } = useHelper();

  return (
    <AppBar elevation={0} component="nav" className={classes.appbarRoot}>
      <Toolbar>
        {!smallScreen && (
          <Box>
            <IconButton onClick={toggleSidebar}>
              <MenuIcon className={classes.sidebarToggler} />
            </IconButton>
          </Box>
        )}

        <Box sx={{ marginLeft: "auto" }}>
          {user.uid && (
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
                {user.roles.includes(Roles.PODCASTER) ? (
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
          {!user.uid &&
            (smallScreen ? (
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

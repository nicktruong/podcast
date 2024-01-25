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
import Search from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

import { ROLES } from "@/common/enums";
import { routes } from "@/common/constants";

import usePrepare from "./usePrepare";

export default function UserMenu() {
  const {
    open,
    userId,
    classes,
    anchorEl,
    userRoles,
    isSearchPage,
    isSmallScreen,
    search,
    navigate,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  } = usePrepare();

  return (
    <AppBar elevation={0} component="nav" className={classes.appbarRoot}>
      <Toolbar>
        {!isSmallScreen && (
          <Box className={classes.iconButtonContainer}>
            <IconButton onClick={toggleSidebar}>
              <MenuIcon className={classes.sidebarToggler} />
            </IconButton>
          </Box>
        )}

        {isSearchPage && (
          <Box className={classes.searchContainer}>
            <Search className={classes.searchIcon} />
            <input
              onChange={(e) => search(e.target.value)}
              className={classes.searchInput}
              placeholder="What do you want to listen to?"
            />
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
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate(routes.profile.replace(":id", userId));
                  }}
                >
                  Profile
                </MenuItem>
                {userRoles?.includes(ROLES.PODCASTER) ? (
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      navigate(routes.podcasterDashboard);
                    }}
                  >
                    Go to Podcast Dashboard
                  </MenuItem>
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
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      navigate(routes.signup);
                    }}
                  >
                    Sign up
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      navigate(routes.login);
                    }}
                  >
                    Log in
                  </MenuItem>
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

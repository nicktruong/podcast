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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Roles } from "@/enums";
import { routes } from "@/constants";
import { withSuspense } from "@/HOCs";
import { ChangeLanguageButton } from "@/components";

import usePrepareHook from "./helpers";

const UserMenu = () => {
  const {
    open,
    userId,
    classes,
    anchorEl,
    userRoles,
    isSmaller,
    isSearchPage,
    isSidebarExpand,
    unreadNotificationsCount,
    t,
    handleSearch,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  } = usePrepareHook();

  console.log("USERNEMENU");

  return (
    <AppBar elevation={0} className={classes.appbarRoot} component="nav">
      <Toolbar className={classes.toolbar}>
        {isSmaller && (
          <Box className={classes.iconButtonContainer}>
            <IconButton onClick={toggleSidebar}>
              {isSidebarExpand ? (
                <ChevronLeftIcon className={classes.sidebarToggler} />
              ) : (
                <ChevronRightIcon className={classes.sidebarToggler} />
              )}
            </IconButton>
          </Box>
        )}

        {isSearchPage && (
          <Box className={classes.searchContainer}>
            <Search className={classes.searchIcon} />
            <input
              className={classes.searchInput}
              placeholder={t("whatDoYouWantToListen")}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </Box>
        )}

        <Box className={classes.actions}>
          {userId && (
            <>
              <ChangeLanguageButton />
              <Link to={routes.notification}>
                <Box className={classes.notificationContainer}>
                  {unreadNotificationsCount > 0 && (
                    <span className={classes.notificationCount}>
                      {unreadNotificationsCount}
                    </span>
                  )}
                  <NotificationsIcon className={classes.notificationIcon} />
                </Box>
              </Link>
              <Box>
                <IconButton
                  aria-haspopup="true"
                  id="user-menu-button"
                  onClick={handleClickOpenMenu}
                  aria-expanded={open ? "true" : undefined}
                  aria-controls={open ? "user-menu" : undefined}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  open={open}
                  id="user-menu"
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                  className={classes.mobileMenu}
                  aria-labelledby="user-menu-button"
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
                    component={Link}
                    onClick={handleCloseMenu}
                    to={routes.profile.replace(":id", userId)}
                  >
                    {t("profile")}
                  </MenuItem>
                  {userRoles?.includes(Roles.PODCASTER) ? (
                    <MenuItem
                      component={Link}
                      onClick={handleCloseMenu}
                      to={routes.podcasterDashboard}
                    >
                      {t("dashboard")}
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleUpgradeToPodcasterRole}>
                      {t("becomeAPodcaster")}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleSignOut}>{t("logout")}</MenuItem>
                </Menu>
              </Box>
            </>
          )}
          {!userId &&
            (isSmaller ? (
              <>
                <IconButton
                  aria-haspopup="true"
                  id="user-menu-button"
                  onClick={handleClickOpenMenu}
                  aria-expanded={open ? "true" : undefined}
                  aria-controls={open ? "user-menu" : undefined}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  open={open}
                  id="user-menu"
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                  className={classes.mobileMenu}
                  aria-labelledby="user-menu-button"
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
                    component={Link}
                    to={routes.signup}
                    onClick={() => handleCloseMenu()}
                  >
                    {t("signup")}
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={routes.login}
                    onClick={handleCloseMenu}
                  >
                    {t("login")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box className={classes.alignCenter}>
                <ChangeLanguageButton />
                <Link to={routes.notification}>
                  <NotificationsIcon />
                </Link>
                <Link to={routes.signup}>
                  <Button className={classes.signUpBtn}>{t("signup")}</Button>
                </Link>
                <Link to={routes.login}>
                  <Button className={classes.loginBtn} variant="contained">
                    {t("login")}
                  </Button>
                </Link>
              </Box>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default withSuspense(UserMenu);

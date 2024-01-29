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

import { ROLES } from "@/common/enums";
import { routes } from "@/common/constants";
import { ChangeLanguageButton } from "@/components";

import usePrepare from "./usePrepare";

export default function UserMenu() {
  const {
    open,
    userId,
    classes,
    anchorEl,
    userRoles,
    isSmaller,
    isSearchPage,
    isSidebarExpand,
    t,
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
        {!isSmaller && (
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
              onChange={(e) => search(e.target.value)}
              placeholder={t("whatDoYouWantToListen")}
            />
          </Box>
        )}

        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {userId && (
            <>
              <ChangeLanguageButton />
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
                    to={routes.profile.replace(":id", userId)}
                    onClick={() => {
                      handleCloseMenu();
                    }}
                  >
                    {t("profile")}
                  </MenuItem>
                  {userRoles?.includes(ROLES.PODCASTER) ? (
                    <MenuItem
                      component={Link}
                      to={routes.podcasterDashboard}
                      onClick={() => {
                        handleCloseMenu();
                      }}
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
                    {t("signup")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      navigate(routes.login);
                    }}
                  >
                    {t("login")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box className={classes.alignCenter}>
                <ChangeLanguageButton />
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
}

import { useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import { useLocation, useNavigate } from "react-router-dom";

import {
  signOut,
  selectUser,
  selectUserRoles,
  upgradeToPodcaster,
} from "@/store/user";
import { routes } from "@/common/constants";
import { useMaxWidthScreenMedia } from "@/common/utils";
import { selectUIState, toggleExpand } from "@/store/ui";
import { searchAction, setSearchText } from "@/store/search";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectUnreadNotificationsCount } from "@/store/notification";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { t } = useTranslation("layouts/Root");

  const theme = useTheme();

  const navigate = useNavigate();

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const { isSidebarExpand } = useAppSelector(selectUIState);

  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const userRoles = useAppSelector(selectUserRoles);

  const unreadNotificationsCount = useAppSelector(
    selectUnreadNotificationsCount
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");

  const { isSmaller } = useMaxWidthScreenMedia(theme.breakpoints.values.md);

  const handleClickOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpgradeToPodcasterRole = () => {
    handleCloseMenu();

    if (!user?.id || !user.roles) return;

    dispatch(
      upgradeToPodcaster({
        userId: user.id,
        userRoles: user.roles,
        emailVerified: !!user.emailVerified,
      })
    );
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(routes.index);
    window.location.reload();
    navigate(routes.index);
  };

  const toggleSidebar = () => {
    dispatch(toggleExpand());
  };

  const search = useDebouncedCallback(
    useCallback((value) => {
      dispatch(setSearchText(value));
      dispatch(searchAction(value));
    }, []),
    500
    // TODO: I'm poor so don't uncomment the below line
    // { maxWait: 2000 }
  );

  return {
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
    search,
    navigate,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  };
};

export default usePrepare;

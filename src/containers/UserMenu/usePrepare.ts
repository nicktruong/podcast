import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import {
  signOut,
  selectUserId,
  selectUserRoles,
  upgradeToPodcaster,
} from "@/store/user";
import { toggleExpand } from "@/store/ui";
import { searchAction } from "@/store/search";
import { useSmallScreen } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const userRoles = useAppSelector(selectUserRoles);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const { isSmallScreen } = useSmallScreen();
  const isSearchPage = location.pathname.includes("/search");

  const handleClickOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpgradeToPodcasterRole = () => {
    handleCloseMenu();
    dispatch(upgradeToPodcaster());
  };

  const handleSignOut = () => {
    dispatch(signOut());
    window.location.reload();
  };

  const toggleSidebar = () => {
    dispatch(toggleExpand());
  };

  const search = useDebouncedCallback(
    useCallback((value) => {
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
    isSearchPage,
    isSmallScreen,
    search,
    toggleSidebar,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  };
};

export default usePrepare;

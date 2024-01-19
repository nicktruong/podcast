import { useState } from "react";

import {
  signOut,
  selectUserId,
  selectUserRoles,
  upgradeToPodcaster,
} from "@/store/user";
import { toggleExpand } from "@/store/ui";
import { useSmallScreen } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const useHelper = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const userRoles = useAppSelector(selectUserRoles);

  const { isSmallScreen } = useSmallScreen();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  return {
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
  };
};

export default useHelper;

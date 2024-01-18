import { useState } from "react";

import { toggleExpand } from "@/store/ui/uiSlice";
import { isSmallScreen } from "@/common/utils/media-query";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectUser, signOut, upgradeToPodcaster } from "@/store/userSlice";

import { useStyles } from "./styles";

const useHelper = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const smallScreen = isSmallScreen();

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
    handleCloseMenu();
    dispatch(signOut());
  };

  const toggleSidebar = () => {
    dispatch(toggleExpand());
  };

  return {
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
  };
};

export default useHelper;

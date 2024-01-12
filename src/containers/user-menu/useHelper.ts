import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectUser, signOut, upgradeToPodcaster } from "@/store/userSlice";

const useHelper = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

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

  return {
    user,
    open,
    anchorEl,
    handleSignOut,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  };
};

export default useHelper;

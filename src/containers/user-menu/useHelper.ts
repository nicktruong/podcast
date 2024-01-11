import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectUser, upgradeToPodcaster } from "@/store/userSlice";

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

  return {
    user,
    open,
    anchorEl,
    handleCloseMenu,
    handleClickOpenMenu,
    handleUpgradeToPodcasterRole,
  };
};

export default useHelper;

import { useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import { useLocation, useNavigate } from "react-router-dom";

import {
  signOut,
  selectUserId,
  selectUserRoles,
  upgradeToPodcaster,
} from "@/store/user";
import { searchAction } from "@/store/search";
import { useMaxWidthScreenMedia } from "@/common/utils";
import { selectUIState, toggleExpand } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { t } = useTranslation("RootLayout");

  const theme = useTheme();

  const navigate = useNavigate();

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const { isSidebarExpand } = useAppSelector(selectUIState);

  const userId = useAppSelector(selectUserId);

  const userRoles = useAppSelector(selectUserRoles);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");

  const { isSmaller } = useMaxWidthScreenMedia(theme.breakpoints.values.md);

  const handleClickOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpen(false);
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
  };
};

export default usePrepare;

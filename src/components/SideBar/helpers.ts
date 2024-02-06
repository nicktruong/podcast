import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { routes } from "@/constants";
import { selectUserId } from "@/store/user";
import { selectIsSidebarExpand, toggleExpand } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUserPlaylists, selectPlaylists } from "@/store/playlists";

import { useStyles } from "./styles";

const usePrepareHook = () => {
  const { t } = useTranslation("layouts/Root");

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const playlists = useAppSelector(selectPlaylists);

  const isSidebarExpand = useAppSelector(selectIsSidebarExpand);

  const { cx, classes } = useStyles();

  const { pathname } = useLocation();

  const active = {
    [routes.index]: pathname === routes.index,
    [routes.search]: pathname === routes.search,
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPlaylists(userId));
    }
  }, [userId]);

  const toggleSidebar = () => {
    dispatch(toggleExpand());
  };

  return { active, classes, playlists, isSidebarExpand, t, cx, toggleSidebar };
};

export default usePrepareHook;

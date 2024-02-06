import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { routes } from "@/constants";
import { selectPlaylists } from "@/store/playlists";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectIsSidebarExpand, toggleExpand } from "@/store/ui";

import { useStyles } from "./styles";

const usePrepareHook = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { cx, classes } = useStyles();
  const { t } = useTranslation("layouts/Root");

  const playlists = useAppSelector(selectPlaylists);
  const isSidebarExpand = useAppSelector(selectIsSidebarExpand);

  const active = {
    [routes.index]: pathname === routes.index,
    [routes.search]: pathname === routes.search,
  };

  const toggleSidebar = () => {
    dispatch(toggleExpand());
  };

  return { active, classes, playlists, isSidebarExpand, t, cx, toggleSidebar };
};

export default usePrepareHook;

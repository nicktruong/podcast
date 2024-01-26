import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { routes } from "@/common/constants";
import { selectUserId } from "@/store/user";
import { selectIsSidebarExpand } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUserPlaylists, selectPlaylists } from "@/store/playlists";

import { useStyles } from "./styles";

const usePrepare = () => {
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

  return { cx, active, classes, playlists, isSidebarExpand };
};

export default usePrepare;

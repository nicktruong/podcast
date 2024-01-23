import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { selectUIState } from "@/store/ui";
import { selectUserId } from "@/store/user";
import { routes } from "@/common/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserPlaylists, selectPlaylists } from "@/store/playlists";

import { useStyles } from "./styles";

const usePrepare = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const playlists = useAppSelector(selectPlaylists);

  const { isSidebarExpand } = useAppSelector(selectUIState);

  const { cx, classes } = useStyles();

  const { pathname } = useLocation();

  const active = {
    [routes.index]: pathname === routes.index ? classes.active : "",
    [routes.search]: pathname === routes.search ? classes.active : "",
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserPlaylists());
    }
  }, [userId]);

  return { active, cx, classes, isSidebarExpand, playlists };
};

export default usePrepare;

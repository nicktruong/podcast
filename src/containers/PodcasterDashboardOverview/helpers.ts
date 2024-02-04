import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { selectPodcast } from "@/store/podcast";
import { selectUser, selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPods, fetchEpisodesFromCreatorPaged } from "@/store/episode";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const episodes = useAppSelector(selectPods);
  const userId = useAppSelector(selectUserId);
  const podcast = useAppSelector(selectPodcast);
  const { t } = useTranslation("pages/PodcasterDashboard");

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchEpisodesFromCreatorPaged({ creatorId: userId, pageSize: 1 })
      );
    }
  }, [userId]);

  return { user, classes, podcast, episodes, t };
};

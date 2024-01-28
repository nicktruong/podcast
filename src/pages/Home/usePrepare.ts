import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  selectTrendings,
  selectPodcastsToTry,
  selectPodcastsForYou,
  selectRecentlyPlayed,
  fetchPodcastsToTryPaged,
  fetchPodcastsForYouPaged,
  fetchTrendingPodcastsPaged,
  selectLoadingPodcastsForListener,
  fetchRecentlyPlayedPodcastsPaged,
  selectFetchedPodcastsForListener,
} from "@/store/listenerPodcastSeries";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";
import { SectionData } from "./interfaces";

const usePrepare = () => {
  const { t } = useTranslation("Home");

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const trendingPodcasts = useAppSelector(selectTrendings);
  const podcastsToTry = useAppSelector(selectPodcastsToTry);
  const podcastsForYou = useAppSelector(selectPodcastsForYou);
  const recentlyPlayed = useAppSelector(selectRecentlyPlayed);

  const loading = useAppSelector(selectLoadingPodcastsForListener);
  const fetched = useAppSelector(selectFetchedPodcastsForListener);

  const sections: SectionData[] = [
    {
      key: "recentlyPlayed",
      title: t("recentlyPlayed"),
      podcasts: recentlyPlayed,
    },
    {
      key: "trendings",
      title: t("trendings"),
      podcasts: trendingPodcasts,
    },
    {
      key: "podcastsForYou",
      title: t("podcastsForYou"),
      podcasts: podcastsForYou,
    },
    {
      key: "podcastsToTry",
      title: t("podcastsToTry"),
      podcasts: podcastsToTry,
    },
  ];

  useEffect(() => {
    const init = async () => {
      if (userId) {
        !loading.recentlyPlayed &&
          (await dispatch(fetchRecentlyPlayedPodcastsPaged()));
      }

      !loading.trendings &&
        !fetched.trendings &&
        (await dispatch(fetchTrendingPodcastsPaged({ pageSize: 7 })));

      if (!userId) {
        return;
      }

      !loading.podcastsForYou &&
        !fetched.podcastsForYou &&
        (await dispatch(fetchPodcastsForYouPaged({ pageSize: 7, period: 30 })));

      !loading.podcastsToTry &&
        !fetched.podcastsToTry &&
        (await dispatch(fetchPodcastsToTryPaged({ pageSize: 7 })));
    };

    init();
  }, [userId]);

  return {
    classes,
    loading,
    sections,
  };
};

export default usePrepare;

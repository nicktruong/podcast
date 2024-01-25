/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";

import {
  selectTrendings,
  selectLoadingPodcastsForListener,
  selectPodcastsToTry,
  selectPodcastsForYou,
  selectRecentlyPlayed,
  fetchPodcastsToTryPaged,
  fetchPodcastsForYouPaged,
  fetchTrendingPodcastsPaged,
  fetchRecentlyPlayedPodcastsPaged,
  selectFetchedPodcastsForListener,
} from "@/store/listenerPodcastSeries";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";
import { SectionData } from "./interfaces";

const usePrepare = () => {
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
      title: "Recently played",
      podcasts: recentlyPlayed,
    },
    {
      key: "trendings",
      title: "Trending podcasts",
      podcasts: trendingPodcasts,
    },
    {
      key: "podcastsForYou",
      title: "Podcasts for you",
      podcasts: podcastsForYou,
    },
    {
      key: "podcastsToTry",
      title: "Podcasts to try",
      podcasts: podcastsToTry,
    },
  ];

  useEffect(() => {
    const initTrendingPodcastSection = async () => {
      !loading.trendings &&
        !fetched.trendings &&
        (await dispatch(fetchTrendingPodcastsPaged({ pageSize: 7 })));
    };

    initTrendingPodcastSection();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!userId) {
        return;
      }

      !loading.recentlyPlayed &&
        (await dispatch(fetchRecentlyPlayedPodcastsPaged()));

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

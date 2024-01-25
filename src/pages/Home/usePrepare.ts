/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";

import {
  selectTrendings,
  selectPodcastsToTry,
  selectPodcastsForYou,
  selectRecentlyPlayed,
  fetchPodcastsToTryPaged,
  fetchPodcastsForYouPaged,
  fetchTrendingPodcastsPaged,
  fetchRecentlyPlayedPodcastsPaged,
  selectLoadingPodcastsForYou,
  selectLoadingPodcastsToTry,
  selectLoadingTrendings,
  selectLoadingRecentlyPlayed,
} from "@/store/listenerPodcastSeries";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const podcastsToTry = useAppSelector(selectPodcastsToTry);
  const trendingPodcasts = useAppSelector(selectTrendings);
  const podcastsForYou = useAppSelector(selectPodcastsForYou);
  const recentlyPlayed = useAppSelector(selectRecentlyPlayed);

  const loadingTrendingPodcasts = useAppSelector(selectLoadingTrendings);
  const loadingPodcastsToTry = useAppSelector(selectLoadingPodcastsToTry);
  const loadingPodcastsForYou = useAppSelector(selectLoadingPodcastsForYou);
  const loadingRecentlyPlayed = useAppSelector(selectLoadingRecentlyPlayed);

  const sections = [
    { title: "Recently played", podcasts: recentlyPlayed },
    { title: "Trending podcasts", podcasts: trendingPodcasts },
    { title: "Podcasts for you", podcasts: podcastsForYou },
    { title: "Podcasts to try", podcasts: podcastsToTry },
  ];

  useEffect(() => {
    const init = async () => {
      !loadingRecentlyPlayed &&
        (await dispatch(fetchRecentlyPlayedPodcastsPaged()));

      !loadingTrendingPodcasts &&
        (await dispatch(fetchTrendingPodcastsPaged({ pageSize: 7 })));

      if (!userId) {
        return;
      }

      !loadingPodcastsForYou &&
        (await dispatch(fetchPodcastsForYouPaged({ pageSize: 7, period: 30 })));

      !loadingPodcastsToTry &&
        (await dispatch(fetchPodcastsToTryPaged({ pageSize: 7 })));
    };

    init();
  }, [userId]);

  return { classes, sections };
};

export default usePrepare;

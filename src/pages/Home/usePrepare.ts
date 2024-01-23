import { useEffect } from "react";

import {
  fetchSeriesToTryPaged,
  fetchSeriesForYouPaged,
  fetchRecentlyPlayedSeries,
  selectSeriesToTry,
  selectSeriesForYou,
  selectTrendingSeries,
  selectRecentlyPlayed,
  fetchTrendingSeriesPaged,
} from "@/store/listenerPodcastSeries";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const seriesToTry = useAppSelector(selectSeriesToTry);
  const seriesForYou = useAppSelector(selectSeriesForYou);
  const recentlyPlayed = useAppSelector(selectRecentlyPlayed);
  const trendingPodcasts = useAppSelector(selectTrendingSeries);

  const sections = [
    { title: "Recently played", podcasts: recentlyPlayed },
    { title: "Trending podcasts", podcasts: trendingPodcasts },
    { title: "Series for you", podcasts: seriesForYou },
    { title: "Series to try", podcasts: seriesToTry },
  ];

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchRecentlyPlayedSeries());
      await dispatch(fetchTrendingSeriesPaged({ pageSize: 7 }));

      if (userId) {
        await dispatch(fetchSeriesForYouPaged({ pageSize: 7, period: 30 }));
        await dispatch(fetchSeriesToTryPaged({ pageSize: 7 }));
      }
    };

    init();
  }, [userId]);

  return { classes, sections };
};

export default usePrepare;

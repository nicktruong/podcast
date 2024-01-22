import { useEffect } from "react";

import {
  getSeriesToTry,
  getSeriesForYou,
  getRecentlyPlayed,
  selectSeriesToTry,
  selectSeriesForYou,
  selectTrendingSeries,
  selectRecentlyPlayed,
  getTrendingPodcastSeriesPaginationAction,
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
      await dispatch(getRecentlyPlayed());
      await dispatch(getTrendingPodcastSeriesPaginationAction({ pageSize: 7 }));

      if (userId) {
        await dispatch(getSeriesForYou({ pageSize: 7, period: 30 }));
        await dispatch(getSeriesToTry({ pageSize: 7 }));
      }
    };

    init();
  }, [userId]);

  return { classes, sections };
};

export default usePrepare;

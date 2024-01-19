import { useEffect } from "react";

import {
  selectTrendingSeries,
  getTrendingPodcastSeriesPaginationAction,
  getSeriesForYou,
  selectSeriesForYou,
  selectSeriesToTry,
  getSeriesToTry,
} from "@/store/userPodcastSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectUserId } from "@/store/userSlice";

import { useStyles } from "./styles";

const useHelper = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const seriesToTry = useAppSelector(selectSeriesToTry);
  const seriesForYou = useAppSelector(selectSeriesForYou);
  const trendingPodcasts = useAppSelector(selectTrendingSeries);

  const sections = [
    { title: "Trending podcasts", podcasts: trendingPodcasts },
    { title: "Series for you", podcasts: seriesForYou },
    { title: "Series to try", podcasts: seriesToTry },
  ];

  useEffect(() => {
    const init = async () => {
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

export default useHelper;

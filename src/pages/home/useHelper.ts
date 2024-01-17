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

import { useStyles } from "./styles";

const useHelper = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const trendingPodcasts = useAppSelector(selectTrendingSeries);
  const seriesForYou = useAppSelector(selectSeriesForYou);
  const seriesToTry = useAppSelector(selectSeriesToTry);

  useEffect(() => {
    dispatch(getTrendingPodcastSeriesPaginationAction({ pageSize: 7 }))
      .then(() => dispatch(getSeriesForYou({ pageSize: 7, period: 30 })))
      .then(() => dispatch(getSeriesToTry({ pageSize: 7 })));
  }, []);

  return { classes, trendingPodcasts, seriesForYou, seriesToTry };
};

export default useHelper;

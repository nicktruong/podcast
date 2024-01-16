import { useEffect } from "react";

import {
  selectTrendingSeries,
  getTrendingPodcastSeriesPaginationAction,
} from "@/store/userPodcastSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";

import { useStyles } from "./styles";

const useHelper = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const trendingPodcasts = useAppSelector(selectTrendingSeries);

  useEffect(() => {
    dispatch(getTrendingPodcastSeriesPaginationAction({ pageSize: 7 }));
  }, []);

  return { classes, trendingPodcasts };
};

export default useHelper;

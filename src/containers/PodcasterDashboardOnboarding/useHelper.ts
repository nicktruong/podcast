import { useEffect } from "react";

import {
  fetchSeriesImage,
  selectCoverImage,
  selectHasPodSeries,
} from "@/store/podcastSeries";
import { selectCreatorsPodcasts } from "@/store/podcast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const useHelper = () => {
  const dispatch = useAppDispatch();

  const seriesImage = useAppSelector(selectCoverImage);

  const createdFirstEp =
    useAppSelector(selectCreatorsPodcasts)[0] !== undefined;

  const hasPodSeries = useAppSelector(selectHasPodSeries);

  const { classes, cx } = useStyles();

  useEffect(() => {
    if (!seriesImage) {
      dispatch(fetchSeriesImage());
    }
  }, []);

  return {
    cx,
    classes,
    hasPodSeries,
    createdFirstEp,
  };
};

export default useHelper;

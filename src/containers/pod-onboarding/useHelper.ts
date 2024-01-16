import { useEffect } from "react";

import {
  fetchSeriesImage,
  selectCoverImage,
  selectHasPodSeries,
} from "@/store/podSeriesSlice";
import { selectCreatorsPodcasts } from "@/store/podSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";

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

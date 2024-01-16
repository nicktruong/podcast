import { useEffect, useState } from "react";

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

  const [openCreateEpisodeDialog, setOpenCreateEpisodeDialog] = useState(false);

  const [openCreateSeriesDialog, setOpenCreateSeriesDialog] = useState(false);

  const handleClickOpenEpisodeDialog = () => {
    setOpenCreateEpisodeDialog(true);
  };

  const handleOpenCreateSeriesDialog = () => {
    setOpenCreateSeriesDialog(true);
  };

  const handleCloseSeriesDialog = () => {
    setOpenCreateSeriesDialog(false);
  };

  const handleCloseEpisodeDialog = () => {
    setOpenCreateEpisodeDialog(false);
  };

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
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    handleCloseSeriesDialog,
    handleCloseEpisodeDialog,
    handleClickOpenEpisodeDialog,
    handleOpenCreateSeriesDialog,
  };
};

export default useHelper;

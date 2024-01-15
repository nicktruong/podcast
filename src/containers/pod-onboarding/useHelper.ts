import { useEffect, useState } from "react";

import {
  getCreatorsPodsPaginationAction,
  selectCreatorsPodcasts,
} from "@/store/podSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";

import { useStyles } from "./styles";

const useHelper = () => {
  const createdFirstEp =
    useAppSelector(selectCreatorsPodcasts)[0] !== undefined;

  const dispatch = useAppDispatch();

  const { classes, cx } = useStyles();

  const [openCreateEpisodeDialog, setOpenCreateEpisodeDialog] = useState(false);

  const handleClickOpenEpisodeDialog = () => {
    setOpenCreateEpisodeDialog(true);
  };

  const handleCloseEpisodeDialog = () => {
    setOpenCreateEpisodeDialog(false);
  };

  useEffect(() => {
    dispatch(getCreatorsPodsPaginationAction({ pageSize: 1 }));
  }, []);

  return {
    cx,
    classes,
    createdFirstEp,
    openCreateEpisodeDialog,
    handleCloseEpisodeDialog,
    handleClickOpenEpisodeDialog,
  };
};

export default useHelper;

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
  PodcasterCreateSeriesDialog,
  PodcasterDashboardOnboarding,
} from "@/containers";
import {
  selectCreatorsPodcasts,
  getCreatorsPodsPaginationAction,
} from "@/store/podcast";
import {
  fetchCreatorPodSeries,
  selectPodSeriesMetadata,
} from "@/store/podcastSeries";
import { selectUserId } from "@/store/user";
import PodAppbar from "@/containers/PodcasterDashboardAppBar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import PodDashboardOverview from "@/containers/PodcasterDashboard/PodcasterDashboard";
import PodcasterEpisodeCreationDialog from "@/containers/PodcasterEpisodeCreationDialog";

export default function PodcasterDashboard() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const { loading, hasPodSeries } = useAppSelector(selectPodSeriesMetadata);
  const createdFirstEp =
    useAppSelector(selectCreatorsPodcasts)[0] !== undefined;

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
    if (userId) {
      dispatch(fetchCreatorPodSeries(userId));
      dispatch(getCreatorsPodsPaginationAction({ pageSize: 1 }));
    }
  }, [userId]);

  if (loading) {
    return <>Loading...</>;
  }

  let content: JSX.Element;

  if (!hasPodSeries || !createdFirstEp) {
    content = (
      <PodcasterDashboardOnboarding
        handleClickOpenEpisodeDialog={handleClickOpenEpisodeDialog}
        handleOpenCreateSeriesDialog={handleOpenCreateSeriesDialog}
      />
    );
  } else {
    content = <PodDashboardOverview />;
  }

  return (
    <Box>
      <PodAppbar handleClickOpenEpisodeDialog={handleClickOpenEpisodeDialog} />

      {content}

      <PodcasterEpisodeCreationDialog
        open={openCreateEpisodeDialog}
        handleClose={handleCloseEpisodeDialog}
      />

      <PodcasterCreateSeriesDialog
        open={openCreateSeriesDialog}
        handleClose={handleCloseSeriesDialog}
      />
    </Box>
  );
}

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
  selectCreatorsPodcasts,
  getCreatorsPodsPaginationAction,
} from "@/store/podSlice";
import {
  fetchCreatorPodSeries,
  selectPodSeriesMetadata,
} from "@/store/podSeriesSlice";
import { selectUser } from "@/store/userSlice";
import PodAppbar from "@/containers/pod-app-bar/PodAppBar";
import { PodOnboarding } from "@/containers/pod-onboarding";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { PodcasterCreateSeriesDialog } from "@/containers/PodcasterCreateSeriesDialog";
import PodDashboardOverview from "@/containers/pod-dashboard-overview/PodDashboardOverview";
import PodCreateEpisodeDialog from "@/containers/pod-create-episode-dialog/PodCreateEpisodeDialog";

export default function PodDashboard() {
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector(selectUser);
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
    if (uid) {
      dispatch(fetchCreatorPodSeries(uid));
      dispatch(getCreatorsPodsPaginationAction({ pageSize: 1 }));
    }
  }, [uid]);

  if (loading) {
    return <>Loading...</>;
  }

  let content: JSX.Element;

  if (!hasPodSeries || !createdFirstEp) {
    content = (
      <PodOnboarding
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

      <PodCreateEpisodeDialog
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

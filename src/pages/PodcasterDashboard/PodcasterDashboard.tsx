import Box from "@mui/material/Box";

import {
  DashboardAppBar,
  DashboardOverview,
  CreatePodcastDialog,
  PodcasterOnboarding,
  CreateEpisodeDialog,
} from "@/containers";
import { Loader } from "@/components";

import { usePrepareHook } from "./helpers";

export default function PodcasterDashboard() {
  const {
    episodesAreLoading,
    createdFirstEpisode,
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    podcastOfCreatorIsLoading,
    handleOpenDialog,
    handleCloseDialog,
  } = usePrepareHook();

  if (episodesAreLoading || podcastOfCreatorIsLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <DashboardAppBar onOpenDialog={handleOpenDialog} />

      {!createdFirstEpisode ? (
        <PodcasterOnboarding onOpenDialog={handleOpenDialog} />
      ) : (
        <DashboardOverview />
      )}

      <CreateEpisodeDialog
        open={openCreateEpisodeDialog}
        onClose={handleCloseDialog}
      />

      <CreatePodcastDialog
        open={openCreateSeriesDialog}
        handleClose={handleCloseDialog}
      />
    </Box>
  );
}

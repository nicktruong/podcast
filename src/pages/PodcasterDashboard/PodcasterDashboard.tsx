import Box from "@mui/material/Box";

import {
  PodcasterDashboardAppBar,
  PodcasterDashboardOverview,
  PodcasterCreateSeriesDialog,
  PodcasterDashboardOnboarding,
  PodcasterEpisodeCreationDialog,
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
      <PodcasterDashboardAppBar onOpenDialog={handleOpenDialog} />

      {!createdFirstEpisode ? (
        <PodcasterDashboardOnboarding onOpenDialog={handleOpenDialog} />
      ) : (
        <PodcasterDashboardOverview />
      )}

      <PodcasterEpisodeCreationDialog
        open={openCreateEpisodeDialog}
        onClose={handleCloseDialog}
      />

      <PodcasterCreateSeriesDialog
        open={openCreateSeriesDialog}
        handleClose={handleCloseDialog}
      />
    </Box>
  );
}

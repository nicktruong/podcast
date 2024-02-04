import Box from "@mui/material/Box";

import {
  PodcasterDashboardAppBar,
  PodcasterDashboardOverview,
  PodcasterCreateSeriesDialog,
  PodcasterDashboardOnboarding,
  PodcasterEpisodeCreationDialog,
} from "@/containers";
import { Loader } from "@/components";

import { usePrepare } from "./usePrepare";

export default function PodcasterDashboard() {
  const {
    episodesAreLoading,
    createdFirstEpisode,
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    podcastOfCreatorIsLoading,
    handleOpenDialog,
    handleCloseDialog,
  } = usePrepare();

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

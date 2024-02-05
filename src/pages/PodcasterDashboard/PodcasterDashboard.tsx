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
    handleCloseEpisodeDialog,
    handleClickOpenEpisodeDialog,
  } = usePrepare();

  if (episodesAreLoading || podcastOfCreatorIsLoading) {
    return <Loader />;
  }

  let content: JSX.Element;

  if (!createdFirstEpisode) {
    content = (
      <PodcasterDashboardOnboarding
        handleClickOpenEpisodeDialog={handleClickOpenEpisodeDialog}
        handleOpenCreateSeriesDialog={handleClickOpenEpisodeDialog}
      />
    );
  } else {
    content = <PodcasterDashboardOverview />;
  }

  return (
    <Box>
      <PodcasterDashboardAppBar
        handleClickOpenEpisodeDialog={handleClickOpenEpisodeDialog}
      />

      {content}

      <PodcasterEpisodeCreationDialog
        open={openCreateEpisodeDialog}
        handleClose={handleCloseEpisodeDialog}
      />

      <PodcasterCreateSeriesDialog
        open={openCreateSeriesDialog}
        handleClose={handleCloseEpisodeDialog}
      />
    </Box>
  );
}

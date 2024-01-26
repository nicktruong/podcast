import Box from "@mui/material/Box";

import {
  PodcasterCreateSeriesDialog,
  PodcasterDashboardOnboarding,
} from "@/containers";
import PodAppbar from "@/containers/PodcasterDashboardAppBar";
import PodDashboardOverview from "@/containers/PodcasterDashboard/PodcasterDashboard";
import PodcasterEpisodeCreationDialog from "@/containers/PodcasterEpisodeCreationDialog";
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
        handleClose={handleCloseEpisodeDialog}
      />
    </Box>
  );
}

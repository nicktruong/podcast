import { useEffect, useState } from "react";

import {
  resetUploadPodState,
  selectEpisodesOfCreator,
  selectEpisodesAreLoading,
  fetchEpisodesFromCreatorPaged,
} from "@/store/episode";
import {
  selectPodcast,
  fetchSinglePodcastOfCreatorId,
  selectLoadingPodcastOfCreator,
} from "@/store/podcast";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const usePrepareHook = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const createdFirstEpisode =
    useAppSelector(selectEpisodesOfCreator)[0] !== undefined;

  const podcast = useAppSelector(selectPodcast);

  const episodesAreLoading = useAppSelector(selectEpisodesAreLoading);

  const podcastOfCreatorIsLoading = useAppSelector(
    selectLoadingPodcastOfCreator
  );

  const [openCreateSeriesDialog, setOpenCreateSeriesDialog] = useState(false);

  const [openCreateEpisodeDialog, setOpenCreateEpisodeDialog] = useState(false);

  const handleOpenDialog = () => {
    if (!podcast) {
      setOpenCreateSeriesDialog(true);
    } else {
      setOpenCreateEpisodeDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenCreateSeriesDialog(false);
    setOpenCreateEpisodeDialog(false);
    dispatch(resetUploadPodState());
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSinglePodcastOfCreatorId(userId));
      dispatch(
        fetchEpisodesFromCreatorPaged({ creatorId: userId, pageSize: 1 })
      );
    }
  }, [userId]);

  return {
    episodesAreLoading,
    createdFirstEpisode,
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    podcastOfCreatorIsLoading,
    handleOpenDialog,
    handleCloseDialog,
  };
};

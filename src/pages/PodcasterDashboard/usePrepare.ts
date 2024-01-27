import { useEffect, useState } from "react";

import {
  getEpisodesFromCreatorPaged,
  selectEpisodesAreLoading,
  selectEpisodesOfCreator,
} from "@/store/episode";
import {
  fetchSinglePodcastOfCreatorId,
  selectLoadingPodcastOfCreator,
  selectPodcast,
} from "@/store/podcast";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const usePrepare = () => {
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

  const handleClickOpenEpisodeDialog = () => {
    if (!podcast) {
      setOpenCreateSeriesDialog(true);
    } else {
      setOpenCreateEpisodeDialog(true);
    }
  };

  const handleCloseEpisodeDialog = () => {
    setOpenCreateSeriesDialog(false);
    setOpenCreateEpisodeDialog(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSinglePodcastOfCreatorId(userId));
      dispatch(getEpisodesFromCreatorPaged({ creatorId: userId, pageSize: 1 }));
    }
  }, [userId]);

  return {
    episodesAreLoading,
    createdFirstEpisode,
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    podcastOfCreatorIsLoading,
    handleCloseEpisodeDialog,
    handleClickOpenEpisodeDialog,
  };
};

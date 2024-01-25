import { useEffect, useState } from "react";

import {
  getEpisodesFromCreatorPaged,
  selectEpisodesOfCreator,
} from "@/store/podcast";
import {
  fetchSinglePodcastOfCreatorId,
  selectPodcast,
} from "@/store/podcastSeries";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const createdFirstEpisode =
    useAppSelector(selectEpisodesOfCreator)[0] !== undefined;

  const podcast = useAppSelector(selectPodcast);

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
    setOpenCreateEpisodeDialog(false);
    setOpenCreateSeriesDialog(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSinglePodcastOfCreatorId(userId));
      dispatch(getEpisodesFromCreatorPaged({ creatorId: userId, pageSize: 1 }));
    }
  }, [userId]);

  return {
    createdFirstEpisode,
    openCreateSeriesDialog,
    openCreateEpisodeDialog,
    handleCloseEpisodeDialog,
    handleClickOpenEpisodeDialog,
  };
};

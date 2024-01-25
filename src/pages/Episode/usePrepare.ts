import { useParams } from "react-router-dom";
import { MouseEvent, SyntheticEvent, useEffect, useState } from "react";

import {
  createPlaylist,
  selectPlaylists,
  addToPlaylistAction,
} from "@/store/playlists";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchEpisodesDetail,
  selectEpisodeDetail,
  selectEpisodeId,
  selectPodcastDetail,
  setEpisodeId,
} from "@/store/details";
import { selectUserId } from "@/store/user";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const episodeDetail = useAppSelector((state) =>
    selectEpisodeDetail(state, id ?? "")
  );
  const userId = useAppSelector(selectUserId);
  const episodeId = useAppSelector(selectEpisodeId);
  const playlists = useAppSelector(selectPlaylists);
  const podcastDetail = useAppSelector(selectPodcastDetail);

  const { classes } = useStyles();

  const [tabIndex, setTabIndex] = useState(0);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(actionMenuAnchorEl);

  useEffect(() => {
    if (id) {
      dispatch(setEpisodeId(id));
    }
  }, [id]);

  useEffect(() => {
    if (episodeId && !podcastDetail) {
      // TODO: fetch episodes + podcast
      dispatch(fetchEpisodesDetail(episodeId));
    }
  }, [episodeId]);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleActionMenuBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleCreatePlaylist = () => {
    if (!podcastDetail || !episodeDetail || !userId) {
      return;
    }

    dispatch(
      createPlaylist({
        coverUrl: podcastDetail.coverUrl,
        episodeId: episodeDetail.id,
        podcastId: podcastDetail.id,
        title: episodeDetail.title,
        userId,
      })
    );
    handleActionMenuClose();
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (!id || !podcastDetail) {
      return;
    }

    dispatch(
      addToPlaylistAction({
        playlistId,
        episodeId: id,
        podcastId: podcastDetail.id,
      })
    );
    handleActionMenuClose();
  };

  return {
    userId,
    classes,
    tabIndex,
    playlists,
    episodeDetail,
    openActionMenu,
    actionMenuAnchorEl,
    handleTabChange,
    handleAddToPlaylist,
    handleCreatePlaylist,
    handleActionMenuClose,
    handleActionMenuBtnClick,
  };
};

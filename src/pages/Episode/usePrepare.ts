import { useParams } from "react-router-dom";
import { MouseEvent, SyntheticEvent, useEffect, useState } from "react";

import {
  createPlaylist,
  selectPlaylists,
  addToPlaylistAction,
} from "@/store/playlists";
import {
  setEpisodeId,
  selectEpisodeId,
  selectEpisodeDetail,
  selectPodcastDetail,
  fetchEpisodesDetail,
} from "@/store/details";
import {
  playAudio,
  setAudioInfo,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
  pauseAudio,
} from "@/store/audio";
import { selectUserId } from "@/store/user";
import { openAudioPlayer } from "@/store/ui";
import { addHistoryAction } from "@/store/history";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { DownloadAndPlayAudioParameters } from "@/store/audio/interfaces";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);
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
        userId,
        title: episodeDetail.title,
        episodeId: episodeDetail.id,
        podcastId: podcastDetail.id,
        coverUrl: podcastDetail.coverUrl,
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

  const handleDownloadAndPlayAudio = (data: DownloadAndPlayAudioParameters) => {
    const { pathToFile, ...audioInfo } = data;

    if (downloadedAudio && data.episodeId === playingEpisodeId) {
      dispatch(playAudio());

      return;
    }

    dispatch(setPassedTimeInSeconds(0));

    dispatch(setAudioInfo(audioInfo));

    dispatch(downloadAndPlayAudio(pathToFile));

    dispatch(openAudioPlayer());

    if (!userId || !podcastDetail?.id) return;
    dispatch(addHistoryAction({ podcastId: podcastDetail.id, userId }));
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  return {
    userId,
    classes,
    tabIndex,
    playlists,
    podcastDetail,
    episodeDetail,
    openActionMenu,
    audioIsPlaying,
    playingEpisodeId,
    actionMenuAnchorEl,
    handleTabChange,
    handlePauseAudio,
    handleAddToPlaylist,
    handleCreatePlaylist,
    handleActionMenuClose,
    handleActionMenuBtnClick,
    handleDownloadAndPlayAudio,
  };
};

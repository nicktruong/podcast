import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import {
  playAudio,
  pauseAudio,
  setAudioInfo,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
} from "@/store/audio";
import {
  selectPlaylists,
  selectLoadingEpisodes,
  removePodcastFromPlaylist,
  selectPlaylistEpisodesDetail,
  fetchUserPlaylistEpisodes,
  removeUserPlaylist,
} from "@/store/playlists";
import { openAudioPlayer } from "@/store/ui";
import { selectUserId } from "@/store/user";
import { addHistoryAction } from "@/store/history";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { DownloadAndPlayAudioParameters } from "@/store/audio/interfaces";
import { routes } from "@/common/constants";

import { useStyles } from "./styles";

import type { PlaylistEpisode } from "@/common/interfaces";

export const usePrepare = () => {
  const navigate = useNavigate();

  const { t } = useTranslation("pages/UserPlaylist");

  const dispatch = useAppDispatch();

  const { cx, classes } = useStyles();

  const { id } = useParams();

  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);
  const userId = useAppSelector(selectUserId);
  const playlists = useAppSelector(selectPlaylists);
  const playlist = playlists.find((playlist) => playlist.id === id);
  const loadingEpisodes = useAppSelector(selectLoadingEpisodes);
  const episodesDetail = useAppSelector(selectPlaylistEpisodesDetail);

  useEffect(() => {
    if (!playlist) return;

    dispatch(fetchUserPlaylistEpisodes(playlist.episodes));
  }, [playlist]);

  const handleRemoveEpisodeFromPlaylist = async ({
    episode,
    playlistId,
  }: {
    playlistId: string;
    episode: PlaylistEpisode;
  }) => {
    await dispatch(removePodcastFromPlaylist({ playlistId, episode })).unwrap();
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

    // TODO: Refactor database playlists => podcasts
    if (!userId) return;
    dispatch(addHistoryAction({ podcastId: data.podcastId, userId }));
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  const handleRemovePlaylist = async () => {
    if (!playlist?.id) return;
    await dispatch(removeUserPlaylist(playlist.id)).unwrap();
    navigate(routes.index);
  };

  return {
    classes,
    playlist,
    episodesDetail,
    audioIsPlaying,
    loadingEpisodes,
    playingEpisodeId,
    t,
    cx,
    handlePauseAudio,
    handleRemovePlaylist,
    handleDownloadAndPlayAudio,
    handleRemoveEpisodeFromPlaylist,
  };
};

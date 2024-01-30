import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  selectPlaylists,
  removePodcastFromPlaylist,
  selectPlaylistEpisodesDetail,
  fetchUserPlaylistEpisodesFromIds,
} from "@/store/playlists";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { routes } from "@/common/constants";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { t } = useTranslation("UserPlaylist");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { cx, classes } = useStyles();

  const { id } = useParams();

  const playlists = useAppSelector(selectPlaylists);

  const playlist = playlists.find((playlist) => playlist.id === id);

  const episodesDetail = useAppSelector(selectPlaylistEpisodesDetail);

  useEffect(() => {
    if (!playlist) return;

    dispatch(
      fetchUserPlaylistEpisodesFromIds(
        playlist.episodes.map((episode) => episode.episodeId)
      )
    );
  }, [playlist]);

  const handleRemovePodcastFromPlaylist = async ({
    podcastId,
    playlistId,
  }: {
    podcastId: string;
    playlistId: string;
  }) => {
    const result = await dispatch(
      removePodcastFromPlaylist({ playlistId, episodeId: podcastId })
    ).unwrap();

    if (result && result.playlistRemoved) {
      navigate(routes.index);
    }
  };

  return {
    classes,
    playlist,
    episodesDetail,
    t,
    cx,
    handleRemovePodcastFromPlaylist,
  };
};

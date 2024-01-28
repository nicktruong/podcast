import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  selectPlaylists,
  removePodcastFromPlaylist,
  selectPlaylistEpisodesDetail,
  fetchUserPlaylistEpisodesDetail,
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
    if (playlist) {
      const episodes = playlist.episodes;

      if (episodes) {
        dispatch(fetchUserPlaylistEpisodesDetail(episodes));
      }
    }
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
    cx,
    classes,
    playlist,
    episodesDetail,
    t,
    handleRemovePodcastFromPlaylist,
  };
};

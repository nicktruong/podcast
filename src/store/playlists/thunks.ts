import {
  addToPlaylist,
  getOwnedPlaylists,
  removeFromPlaylist,
  createOwnedPlaylist,
  getEpisodesDetailFromPlaylistEpisodes,
  removePlaylist,
} from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import type {
  EpisodeReference,
  AddToPlaylistData,
  PlaylistCreationData,
  PlaylistEpisode,
} from "@/common/interfaces";

export const fetchUserPlaylistEpisodes = createAppAsyncThunk(
  "playlists/fetchUserPlaylistEpisodesFromIds",
  async (episodes: PlaylistEpisode[]) => {
    const episodesDetail =
      await getEpisodesDetailFromPlaylistEpisodes(episodes);

    return episodesDetail;
  }
);

export const fetchUserPlaylists = createAppAsyncThunk(
  "playlists/fetchUserPlaylists",
  async (userId: string) => {
    return getOwnedPlaylists({ userId });
  }
);

export const createPlaylist = createAppAsyncThunk(
  "playlists/createPlaylist",
  async ({
    title,
    userId,
    coverUrl,
    podcastId,
    episodeId,
  }: PlaylistCreationData) => {
    const { id, currentDate } = await createOwnedPlaylist({
      title,
      userId,
      coverUrl,
      episodeId,
      podcastId,
    });

    return {
      id,
      title,
      userId,
      coverUrl,
      createdAt: currentDate,
      updatedAt: currentDate,
      episodes: [
        {
          podcastId,
          episodeId,
          addedDate: currentDate,
        },
      ],
    };
  }
);

export const addToPlaylistAction = createAppAsyncThunk(
  "playlists/addToPlaylistAction",
  async ({ episodeId, podcastId, playlistId }: AddToPlaylistData) => {
    const episode = await addToPlaylist({
      episodeId,
      podcastId,
      playlistId,
    });

    return { playlistId, ...episode };
  }
);

export const removePodcastFromPlaylist = createAppAsyncThunk(
  "playlists/removePodcastFromPlaylist",
  async ({ episode, playlistId }: EpisodeReference) => {
    return removeFromPlaylist({ episode, playlistId });
  }
);

export const removeUserPlaylist = createAppAsyncThunk(
  "playlists/removePlaylist",
  async (playlistId: string) => {
    return removePlaylist(playlistId);
  }
);

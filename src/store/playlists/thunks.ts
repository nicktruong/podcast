import {
  addToPlaylist,
  getOwnedPlaylists,
  removeFromPlaylist,
  createOwnedPlaylist,
  getEpisodesDetailFromIds,
} from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import type {
  EpisodeReference,
  AddToPlaylistData,
  PlaylistCreationData,
} from "@/common/interfaces";

export const fetchUserPlaylistEpisodesFromIds = createAppAsyncThunk(
  "playlists/fetchUserPlaylistEpisodesFromIds",
  async (episodeIds: string[]) => {
    const episodesDetail = await getEpisodesDetailFromIds(episodeIds);

    return episodesDetail;
  }
);

export const fetchUserPlaylists = createAppAsyncThunk(
  "playlists/fetchUserPlaylists",
  async (userId: string) => {
    if (!userId) {
      return [];
    }

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
  async ({ episodeId, playlistId }: EpisodeReference) => {
    return removeFromPlaylist({ episodeId, playlistId });
  }
);

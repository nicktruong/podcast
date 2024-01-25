import { createSelector, createSlice } from "@reduxjs/toolkit";

import {
  addToPlaylist,
  getOwnedPlaylists,
  removeFromPlaylist,
  createOwnedPlaylist,
  getEpisodesDetailFromIds,
} from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import {
  SLICE_NAME,
  initialState,
  CREATE_PLAYLIST_ACTION,
  ADD_TO_PLAYLIST_ACTION,
  FETCH_USER_PLAYLIST_EPISODES_DETAIL_ACTION,
  REMOVE_PODCAST_FROM_PLAYLIST_ACTION,
  FETCH_USER_PLAYLIST_ACTION,
} from "./constants";

import type {
  Playlist,
  PlaylistEpisode,
  EpisodeReference,
  AddToPlaylistData,
  PlaylistCreationData,
} from "@/common/interfaces";
import type { RootState } from "..";

export const fetchUserPlaylistEpisodesDetail = createAppAsyncThunk(
  FETCH_USER_PLAYLIST_EPISODES_DETAIL_ACTION,
  async (episodes: PlaylistEpisode[]) => {
    const episodesDetail = await getEpisodesDetailFromIds(
      episodes.map((episode) => episode.episodeId)
    );

    return episodesDetail;
  }
);

export const fetchUserPlaylists = createAppAsyncThunk(
  FETCH_USER_PLAYLIST_ACTION,
  async (userId: string): Promise<Playlist[]> => {
    if (!userId) {
      return [];
    }

    return getOwnedPlaylists({ userId });
  }
);

export const createPlaylist = createAppAsyncThunk(
  CREATE_PLAYLIST_ACTION,
  async ({
    title,
    coverUrl,
    podcastId,
    episodeId,
    userId,
  }: PlaylistCreationData): Promise<Playlist | undefined> => {
    const { id, currentDate } = await createOwnedPlaylist({
      userId,
      title,
      episodeId,
      podcastId,
      coverUrl,
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
  ADD_TO_PLAYLIST_ACTION,
  async (
    data: AddToPlaylistData
  ): Promise<AddToPlaylistData & PlaylistEpisode> => {
    const episode = await addToPlaylist(data);

    return { ...data, ...episode };
  }
);

export const removePodcastFromPlaylist = createAppAsyncThunk(
  REMOVE_PODCAST_FROM_PLAYLIST_ACTION,
  async ({ episodeId, playlistId }: EpisodeReference) => {
    return removeFromPlaylist({ episodeId, playlistId });
  }
);

export const playlistsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserPlaylistEpisodesDetail.pending, (state) => {
        state.loadingEpisodes = true;
      })
      .addCase(
        fetchUserPlaylistEpisodesDetail.fulfilled,
        (state, { payload }) => {
          state.episodes = payload;
          state.loadingEpisodes = false;
        }
      )
      .addCase(fetchUserPlaylistEpisodesDetail.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.loadingPlaylists = true;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, { payload }) => {
        state.loadingPlaylists = false;
        state.playlists = payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, { error }) => {
        state.loadingPlaylists = false;
        console.error(error);
      });

    builder
      .addCase(createPlaylist.fulfilled, (state, { payload }) => {
        if (payload) {
          state.playlists.push(payload);
        }
      })
      .addCase(createPlaylist.rejected, (_, { error }) => {
        // TODO: add toast
        console.error(error);
      });

    builder
      .addCase(addToPlaylistAction.fulfilled, (state, { payload }) => {
        const { addedDate, episodeId, playlistId, podcastId } = payload;

        const playlist = state.playlists.find(
          (playlist) => playlist.id === playlistId
        );

        playlist?.episodes.push({ addedDate, episodeId, podcastId });
      })
      .addCase(addToPlaylistAction.rejected, (_, { error }) => {
        // TODO: add toast
        console.error(error);
      });

    builder
      .addCase(removePodcastFromPlaylist.fulfilled, (state, { payload }) => {
        state.episodes = state.episodes.filter(
          (episode) => episode.id !== payload?.episodeId
        );

        if (payload?.playlistRemoved) {
          state.playlists = state.playlists.filter(
            (playlist) => playlist.id !== payload.playlistId
          );
        }
      })
      .addCase(removePodcastFromPlaylist.rejected, (_, { error }) => {
        console.error(error);
      });
  },
});

export const selectPlaylists = (state: RootState) => state.playlists.playlists;

export const selectPlaylistDetail = createSelector(
  [selectPlaylists, (state: RootState, playlistId: string) => playlistId],
  (playlists, playlistId) =>
    playlists.find((playlist) => playlist.id === playlistId)
);

export const selectPlaylistEpisodesDetail = (state: RootState) =>
  state.playlists.episodes;

export default playlistsSlice.reducer;

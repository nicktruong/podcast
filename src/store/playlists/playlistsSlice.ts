import { createSlice } from "@reduxjs/toolkit";

import {
  createPlaylist,
  fetchUserPlaylists,
  addToPlaylistAction,
  removePodcastFromPlaylist,
  fetchUserPlaylistEpisodes,
  removeUserPlaylist,
} from "./thunks";

import type { PlaylistsState } from "./interfaces";

export const initialState: PlaylistsState = {
  episodes: [],
  playlists: [],
  loadingEpisodes: false,
  loadingPlaylists: false,
};

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserPlaylistEpisodes.pending, (state) => {
        state.loadingEpisodes = true;
      })
      .addCase(fetchUserPlaylistEpisodes.fulfilled, (state, { payload }) => {
        state.episodes = payload;
        state.loadingEpisodes = false;
      })
      .addCase(fetchUserPlaylistEpisodes.rejected, (state, { error }) => {
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
          state.playlists.unshift(payload);
        }
      })
      .addCase(createPlaylist.rejected, (state, { error }) => {
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
      .addCase(addToPlaylistAction.rejected, (state, { error }) => {
        // TODO: add toast
        console.error(error);
      });

    builder
      .addCase(removePodcastFromPlaylist.fulfilled, (state, { payload }) => {
        state.episodes = state.episodes.filter(
          (episode) => episode.id !== payload?.episode.episodeId
        );
      })
      .addCase(removePodcastFromPlaylist.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(removeUserPlaylist.fulfilled, (state, { payload }) => {
        state.playlists = state.playlists.filter(
          (playlist) => playlist.id !== payload
        );
      })
      .addCase(removeUserPlaylist.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export default playlistsSlice.reducer;

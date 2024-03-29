import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const selectPlaylists = (state: RootState) => state.playlists.playlists;

export const selectPlaylistEpisodesDetail = (state: RootState) =>
  state.playlists.episodes;

export const selectLoadingEpisodes = (state: RootState) =>
  state.playlists.loadingEpisodes;

export const selectPlaylistDetail = createSelector(
  [selectPlaylists, (state: RootState, playlistId: string) => playlistId],
  (playlists, playlistId) =>
    playlists.find((playlist) => playlist.id === playlistId)
);

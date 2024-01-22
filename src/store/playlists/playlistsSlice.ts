import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  addToPlaylist,
  getOwnedPlaylists,
  createOwnedPlaylist,
  removeFromPlaylist,
} from "@/firebase";
import { AsyncThunkConfig } from "@/hooks";
import { Playlist } from "@/common/interfaces/Playlist";
import { Podcast, PodcastSeries } from "@/common/interfaces";

import { RootState } from "..";
import { selectUserId } from "../user";
import { selectEpisodeDetail, selectSeriesDetail } from "../details";

import { PlaylistsState } from "./interfaces";

const initialState: PlaylistsState = {
  playlists: [],
  loadingPlaylists: false,
};

export const removePodcastFromPlaylist = createAsyncThunk<
  { playlistRemoved: boolean; playlistId: string } | undefined,
  { podcastId: string; playlistId: string },
  AsyncThunkConfig
>("playlists/removePodcastFromPlaylist", async ({ podcastId, playlistId }) => {
  return removeFromPlaylist({ podcastId, playlistId });
});

export const getUserPlaylists = createAsyncThunk<
  Playlist[],
  void,
  AsyncThunkConfig
>("playlists/getUserPlaylists", async (_, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());

  return getOwnedPlaylists({ userId });
});

export const createPlaylist = createAsyncThunk<
  Playlist | undefined,
  void,
  AsyncThunkConfig
>("playlists/createPlaylist", async (_, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());

  const podcast = selectEpisodeDetail(thunkApi.getState());

  const series = selectSeriesDetail(thunkApi.getState());

  if (!podcast) {
    return;
  }

  const docId = await createOwnedPlaylist({
    userId,
    seriesId: series.id,
    title: podcast.title,
    podcastId: podcast.id,
    coverUrl: series.coverUrl,
  });

  const episodeDetail = selectEpisodeDetail(thunkApi.getState());

  if (!episodeDetail) {
    return;
  }

  return {
    id: docId,
    userId: userId,
    title: podcast.title,
    podcasts: [{ ...episodeDetail, series }],
    coverUrl: series.coverUrl,
  };
});

export const addToPlaylistAction = createAsyncThunk<
  | { playlistId: string; podcast: Podcast | undefined; series: PodcastSeries }
  | undefined,
  { playlistId: string },
  AsyncThunkConfig
>("playlists/addToPlaylist", async ({ playlistId }, thunkApi) => {
  const podcast = selectEpisodeDetail(thunkApi.getState());

  const series = selectSeriesDetail(thunkApi.getState());

  if (!podcast) {
    return;
  }

  await addToPlaylist({
    playlistId,
    seriesId: series.id,
    podcastId: podcast.id,
  });

  const episodeDetail = selectEpisodeDetail(thunkApi.getState());

  return { playlistId, podcast: episodeDetail, series };
});

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserPlaylists.pending, (state) => {
        state.loadingPlaylists = true;
      })
      .addCase(getUserPlaylists.fulfilled, (state, { payload }) => {
        state.loadingPlaylists = false;
        state.playlists = payload;
      })
      .addCase(getUserPlaylists.rejected, (state, { error }) => {
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
        if (payload && payload.podcast) {
          const playlist = state.playlists.find(
            (playlist) => playlist.id === payload.playlistId
          );
          playlist?.podcasts.push({
            ...payload.podcast,
            series: payload.series,
          });
        }
      })
      .addCase(addToPlaylistAction.rejected, (_, { error }) => {
        // TODO: add toast
        console.error(error);
      });

    builder
      .addCase(removePodcastFromPlaylist.fulfilled, (state, { payload }) => {
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

export default playlistsSlice.reducer;

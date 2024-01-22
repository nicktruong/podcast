import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getOwnedPlaylists } from "@/firebase/getPlaylists";
import { createOwnedPlaylist } from "@/firebase/createPlaylist";
import { Podcast } from "@/common/interfaces";
import { addToPlaylist } from "@/firebase/addToPlaylist";
import { AsyncThunkConfig } from "@/hooks";
import { Playlist } from "@/common/interfaces/Playlist";

import { selectUserId } from "../user";
import { selectEpisodeDetail, selectSeriesDetail } from "../details";
import { RootState } from "..";

import { PlaylistsState } from "./interfaces";

const initialState: PlaylistsState = {
  playlists: [],
  loadingPlaylists: false,
};

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
    podcasts: [episodeDetail],
    coverUrl: series.coverUrl,
  };
});

export const addToPlaylistAction = createAsyncThunk<
  { playlistId: string; podcast: Podcast | undefined } | undefined,
  { playlistId: string },
  AsyncThunkConfig
>("playlists/addToPlaylist", async ({ playlistId }, thunkApi) => {
  const podcast = selectEpisodeDetail(thunkApi.getState());

  if (!podcast) {
    return;
  }

  await addToPlaylist({ podcastId: podcast.id, playlistId });

  const episodeDetail = selectEpisodeDetail(thunkApi.getState());

  return { playlistId, podcast: episodeDetail };
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
          playlist?.podcasts.push(payload.podcast);
        }
      })
      .addCase(addToPlaylistAction.rejected, (_, { error }) => {
        // TODO: add toast
        console.error(error);
      });
  },
});

export const selectPlaylists = (state: RootState) => state.playlists.playlists;

export default playlistsSlice.reducer;

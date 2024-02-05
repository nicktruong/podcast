import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  fetchPodcastDetail,
  fetchEpisodesDetail,
  fetchPlaylistEpisodesDetail,
} from "./thunks";

import type { DetailsState } from "./interfaces";

// TODO: Split to multiple fields
const initialState: DetailsState = {
  episodeId: "",
  episodesDetail: [],
  podcastDetail: null,
  loadingPodcast: false,
  loadingEpisodes: false,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setNewRating: (
      state,
      { payload }: PayloadAction<{ newRateCount: number; newRating: number }>
    ) => {
      if (!state.podcastDetail) {
        return;
      }

      state.podcastDetail.rating = payload.newRating;
      state.podcastDetail.rateCount = payload.newRateCount;
    },
    setEpisodeId: (state, action: PayloadAction<string>) => {
      state.episodeId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPodcastDetail.pending, (state) => {
        state.loadingPodcast = true;
      })
      .addCase(fetchPodcastDetail.fulfilled, (state, { payload }) => {
        state.loadingPodcast = false;
        state.podcastDetail = payload;
      })
      .addCase(fetchPodcastDetail.rejected, (state, { error }) => {
        state.loadingPodcast = false;
        console.error(error);
      });

    builder
      .addCase(fetchPlaylistEpisodesDetail.pending, (state) => {
        state.loadingEpisodes = true;
      })
      .addCase(fetchPlaylistEpisodesDetail.fulfilled, (state, { payload }) => {
        state.loadingEpisodes = false;
        state.episodesDetail = payload;
      })
      .addCase(fetchPlaylistEpisodesDetail.rejected, (state, { error }) => {
        state.loadingEpisodes = false;
        console.error(error);
      });

    builder
      .addCase(fetchEpisodesDetail.fulfilled, (state, { payload }) => {
        state.podcastDetail = payload.podcast;
        state.episodesDetail = payload.episodesDetail;
      })
      .addCase(fetchEpisodesDetail.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const { setNewRating, setEpisodeId } = detailsSlice.actions;

export default detailsSlice.reducer;

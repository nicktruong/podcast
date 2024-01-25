import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import {
  getPodcastDetail,
  getEpisodesDetailFromPodcastId,
  getPodcastAndEpisodesDetailFromEpisodeId,
} from "@/firebase";

import { RootState } from "..";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

import { DetailsState } from "./interfaces";

// TODO: Split to multiple fields
const initialState: DetailsState = {
  episodeId: "",
  episodesDetail: [],
  podcastDetail: null,
  loadingPodcast: false,
  loadingEpisodes: false,
};

export const fetchEpisodesDetail = createAppAsyncThunk(
  "details/fetchEpisodesDetail",
  async (episodeId: string) => {
    // TODO: Consider caching
    const { podcast, episodesDetail } =
      await getPodcastAndEpisodesDetailFromEpisodeId(episodeId);

    return { podcast, episodesDetail };
  }
);

export const fetchPlaylistEpisodesDetail = createAppAsyncThunk(
  "details/fetchPlaylistEpisodesDetail",
  async (podcastId: string) => {
    // TODO: Consider caching
    const episodesDetail = await getEpisodesDetailFromPodcastId(podcastId);

    return episodesDetail;
  }
);

export const fetchPodcastDetail = createAppAsyncThunk(
  "details/fetchPodcastDetail",
  async (podcastId: string) => {
    // TODO: Consider caching
    const podcastDetail = await getPodcastDetail(podcastId);

    return podcastDetail;
  }
);

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

export const selectEpisodeId = (state: RootState) => state.details.episodeId;

export const selectPodcastDetail = (state: RootState) =>
  state.details.podcastDetail;

export const selectLoadingPodcastDetail = (state: RootState) =>
  state.details.loadingPodcast;

export const selectEpisodesDetail = (state: RootState) =>
  state.details.episodesDetail;

export const selectLoadingEpisodesDetail = (state: RootState) =>
  state.details.loadingEpisodes;

export const selectEpisodeDetail = createSelector(
  [selectEpisodesDetail, (state: RootState, episodeId: string) => episodeId],
  (episodesDetail, episodeId) =>
    episodesDetail.find((episode) => episode.id === episodeId)
);

export default detailsSlice.reducer;

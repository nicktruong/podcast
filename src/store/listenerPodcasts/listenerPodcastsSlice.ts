import { createSlice } from "@reduxjs/toolkit";

import {
  fetchPodcastsToTryPaged,
  populateStandoutPodcast,
  fetchPodcastsForYouPaged,
  fetchTrendingPodcastsPaged,
  fetchRecentlyPlayedPodcastsPaged,
  fetchPodcastsByCategorySortedAndPaged,
} from "./thunks";

import type { ListenerPodcastsState } from "./interfaces";

const initialLoadingAndFetched = {
  trendings: false,
  podcastsToTry: false,
  recentlyPlayed: false,
  podcastsForYou: false,
  podcastsOfCategory: false,
};

export const initialState: ListenerPodcastsState = {
  trendings: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
  podcastsToTry: [], // random shows
  podcastsForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  standoutPodcast: null,
  podcastsOfCategory: [],
  loadingStandoutPodcast: true,
  loading: initialLoadingAndFetched,
  fetched: initialLoadingAndFetched,
};

export const listenerPodcasts = createSlice({
  name: "listenerPodcasts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecentlyPlayedPodcastsPaged.pending, (state) => {
        state.loading.recentlyPlayed = true;
      })
      .addCase(
        fetchRecentlyPlayedPodcastsPaged.fulfilled,
        (state, { payload }) => {
          if (payload) {
            state.recentlyPlayed = payload;
          }

          state.loading.recentlyPlayed = false;
        }
      )
      .addCase(
        fetchRecentlyPlayedPodcastsPaged.rejected,
        (state, { error }) => {
          console.error(error);
          state.loading.recentlyPlayed = false;
        }
      );

    builder
      .addCase(fetchTrendingPodcastsPaged.pending, (state) => {
        state.loading.trendings = true;
      })
      .addCase(fetchTrendingPodcastsPaged.fulfilled, (state, { payload }) => {
        state.trendings = payload;
        state.loading.trendings = false;
        state.fetched.trendings = true;
      })
      .addCase(fetchTrendingPodcastsPaged.rejected, (state, { error }) => {
        console.error(error);
        state.loading.trendings = false;
      });

    builder
      .addCase(fetchPodcastsToTryPaged.pending, (state) => {
        state.loading.podcastsToTry = true;
      })
      .addCase(fetchPodcastsToTryPaged.fulfilled, (state, { payload }) => {
        state.podcastsToTry = payload;
        state.loading.podcastsToTry = false;
        state.fetched.podcastsToTry = true;
      })
      .addCase(fetchPodcastsToTryPaged.rejected, (state, { error }) => {
        console.error(error);
        state.loading.podcastsToTry = false;
      });

    builder
      .addCase(fetchPodcastsForYouPaged.pending, (state) => {
        state.loading.podcastsForYou = true;
      })
      .addCase(fetchPodcastsForYouPaged.fulfilled, (state, { payload }) => {
        state.podcastsForYou = payload;
        state.loading.podcastsForYou = false;
        state.fetched.podcastsForYou = true;
      })
      .addCase(fetchPodcastsForYouPaged.rejected, (state, { error }) => {
        console.error(error);
        state.loading.podcastsForYou = false;
      });

    builder
      .addCase(fetchPodcastsByCategorySortedAndPaged.pending, (state) => {
        state.loading.podcastsOfCategory = true;
      })
      .addCase(
        fetchPodcastsByCategorySortedAndPaged.fulfilled,
        (state, { payload }) => {
          state.podcastsOfCategory = payload;
          state.loading.podcastsOfCategory = false;
        }
      )
      .addCase(
        fetchPodcastsByCategorySortedAndPaged.rejected,
        (state, { error }) => {
          console.error(error);
          state.loading.podcastsOfCategory = false;
        }
      );

    builder
      .addCase(populateStandoutPodcast.pending, (state) => {
        state.loadingStandoutPodcast = true;
      })
      .addCase(populateStandoutPodcast.fulfilled, (state, { payload }) => {
        state.standoutPodcast = payload;
        state.loadingStandoutPodcast = false;
      })
      .addCase(populateStandoutPodcast.rejected, (state, { error }) => {
        state.loadingStandoutPodcast = false;
        console.error(error);
      });
  },
});

export default listenerPodcasts.reducer;

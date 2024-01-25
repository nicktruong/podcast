import { createSlice } from "@reduxjs/toolkit";

import {
  getRandomPocastsPaged,
  getTrendingPodcastsPaged,
  getRecentlyPlayedPodcastsPaged,
  getPodcastsByCategorySortedAndPaged,
} from "@/firebase";
import { PopulatedPodcast } from "@/common/interfaces";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";
import { selectUser, selectUserCategoriesOfInterest } from "@/store/user";

import {
  SLICE_NAME,
  initialState,
  FETCH_PODCASTS_TO_TRY_PAGED_ACTION,
  FETCH_PODCASTS_FOR_YOU_PAGED_ACTION,
  FETCH_TRENDING_PODCASTS_PAGED_ACTION,
  FETCH_RECENTLY_PLAYED_PODCASTS_ACTION,
  FETCH_PODCASTS_BY_CATEGORY_SORTED_AND_PAGED_ACTION,
} from "./constants";

import type {
  FetchPodcastsByPeriodPaged,
  FetchRecentlyPlayedPodcastsPaged,
  FetchPodcastsByCategorySortedAndPaged,
} from "./interfaces";
import type { RootState } from "@/store";

export const fetchRecentlyPlayedPodcastsPaged = createAppAsyncThunk(
  FETCH_RECENTLY_PLAYED_PODCASTS_ACTION,
  async (params: FetchRecentlyPlayedPodcastsPaged | undefined, thunkApi) => {
    params ??= {
      offset: 0,
      pageSize: 7,
    };

    const { pageSize, offset } = params;

    const user = selectUser(thunkApi.getState());

    if (!user?.history) {
      return;
    }

    const podcasts = await getRecentlyPlayedPodcastsPaged({
      offset,
      pageSize,
      history: user.history,
    });

    return podcasts;
  }
);

export const fetchTrendingPodcastsPaged = createAppAsyncThunk(
  FETCH_TRENDING_PODCASTS_PAGED_ACTION,
  async ({ offset, period = 7, pageSize = 7 }: FetchPodcastsByPeriodPaged) => {
    const trendingPodcasts = await getTrendingPodcastsPaged({
      period,
      offset,
      pageSize,
    });

    return trendingPodcasts;
  }
);

export const fetchPodcastsForYouPaged = createAppAsyncThunk(
  FETCH_PODCASTS_FOR_YOU_PAGED_ACTION,
  async (
    { offset, period = 7, pageSize = 7 }: FetchPodcastsByPeriodPaged,
    thunkApi
  ) => {
    const categories = selectUserCategoriesOfInterest(thunkApi.getState());
    const trendingIds = selectTrendings(thunkApi.getState()).map(
      (podcast) => podcast.id
    );

    const podcastsForYou: PopulatedPodcast[] = [];
    const MAX_REDO = 3;
    let redo = 0;
    const redoPeriodScales = [1, 2, 7];

    while (podcastsForYou.length < pageSize && redo < MAX_REDO) {
      const podcasts = await getTrendingPodcastsPaged({
        offset,
        categories,
        period: period * redoPeriodScales[redo],
        pageSize: pageSize * redoPeriodScales[redo],
      });

      const podcastsForYouIds = podcastsForYou.map((podcast) => podcast.id);

      podcastsForYou.push(
        ...podcasts.filter(
          (podcast) =>
            !trendingIds.includes(podcast.id) &&
            !podcastsForYouIds.includes(podcast.id)
        )
      );
      redo++;
    }

    return podcastsForYou;
  }
);

export const fetchPodcastsToTryPaged = createAppAsyncThunk(
  FETCH_PODCASTS_TO_TRY_PAGED_ACTION,
  async ({ pageSize = 7 }: FetchPodcastsByPeriodPaged, thunkApi) => {
    const podcastsForYouIds = selectPodcastsForYou(thunkApi.getState()).map(
      (podcast) => podcast.id
    );
    const trendingIds = selectTrendings(thunkApi.getState()).map(
      (podcast) => podcast.id
    );
    const ids = podcastsForYouIds.concat(trendingIds);

    const podcastsToTry: PopulatedPodcast[] = [];
    const MAX_REDO = 3;
    const redoPeriodScales = [1, 2, 7];
    let redo = 0;

    while (podcastsToTry.length < pageSize && redo < MAX_REDO) {
      const podcasts = await getRandomPocastsPaged({
        pageSize: pageSize * redoPeriodScales[redo],
      });

      const podcastsToTryIds = podcastsToTry.map((podcast) => podcast.id);

      podcastsToTry.push(
        ...podcasts.filter(
          (podcast) =>
            !ids.includes(podcast.id) && !podcastsToTryIds.includes(podcast.id)
        )
      );

      redo++;
    }

    return podcastsToTry;
  }
);

export const fetchPodcastsByCategorySortedAndPaged = createAppAsyncThunk(
  FETCH_PODCASTS_BY_CATEGORY_SORTED_AND_PAGED_ACTION,
  async ({
    offset,
    sortBy,
    pageSize,
    categories,
  }: FetchPodcastsByCategorySortedAndPaged) => {
    const result = await getPodcastsByCategorySortedAndPaged({
      offset,
      sortBy,
      pageSize,
      categories,
    });

    return result;
  }
);

export const userPodcastsSlice = createSlice({
  name: SLICE_NAME,
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
  },
});

export const selectTrendings = (state: RootState) =>
  state.userPodcasts.trendings;

export const selectLoadingPodcastsForListener = (state: RootState) =>
  state.userPodcasts.loading;

export const selectFetchedPodcastsForListener = (state: RootState) =>
  state.userPodcasts.fetched;

export const selectPodcastsForYou = (state: RootState) =>
  state.userPodcasts.podcastsForYou;

export const selectPodcastsToTry = (state: RootState) =>
  state.userPodcasts.podcastsToTry;

export const selectRecentlyPlayed = (state: RootState) =>
  state.userPodcasts.recentlyPlayed;

export const selectLoadingRecentlyPlayed = (state: RootState) =>
  state.userPodcasts.loading.recentlyPlayed;

export const selectCategoriesSeries = (state: RootState) =>
  state.userPodcasts.podcastsOfCategory;

export default userPodcastsSlice.reducer;

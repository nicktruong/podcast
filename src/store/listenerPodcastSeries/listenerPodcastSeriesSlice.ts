import { createSlice } from "@reduxjs/toolkit";

import {
  selectUser,
  selectUserCategoriesOfInterest,
} from "@/store/user/userSlice";
import {
  getHistorySeries,
  getSeriesPagination,
  getRandomPodcastSeriesPagination,
  getTrendingPodcastSeriesPagination,
} from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import {
  initialState,
  FETCH_SERIES_TO_TRY_PAGED_TYPE,
  FETCH_SERIES_FOR_YOU_PAGED_TYPE,
  FETCH_TRENDING_SERIES_PAGED_TYPE,
  FETCH_RECENTLY_PLAYED_SERIES_TYPE,
  FETCH_SERIES_BY_CATEGORY_SORTED_AND_PAGED_TYPE,
} from "./constants";

import type {
  FetchSeriesByPeriodPaged,
  FetchSeriesByCategorySortedAndPaged,
} from "./interfaces";
import type { RootState } from "@/store";

export const fetchSeriesByCategorySortedAndPaged = createAppAsyncThunk(
  FETCH_SERIES_BY_CATEGORY_SORTED_AND_PAGED_TYPE,
  async ({
    sortBy,
    pageSize,
    categories,
  }: FetchSeriesByCategorySortedAndPaged) => {
    const result = await getSeriesPagination({ pageSize, categories, sortBy });

    return result;
  }
);

export const fetchRecentlyPlayedSeries = createAppAsyncThunk(
  FETCH_RECENTLY_PLAYED_SERIES_TYPE,
  async (_, thunkApi) => {
    const user = selectUser(thunkApi.getState());
    const series = await getHistorySeries(user.history);

    return series;
  }
);

export const fetchTrendingSeriesPaged = createAppAsyncThunk(
  FETCH_TRENDING_SERIES_PAGED_TYPE,
  async ({ period, pageSize }: FetchSeriesByPeriodPaged) => {
    const trendingPodcasts = await getTrendingPodcastSeriesPagination({
      period,
      pageSize,
    });

    return trendingPodcasts;
  }
);

export const fetchSeriesForYouPaged = createAppAsyncThunk(
  FETCH_SERIES_FOR_YOU_PAGED_TYPE,
  async ({ period, pageSize }: FetchSeriesByPeriodPaged, thunkApi) => {
    const trendingSeries = selectTrendingSeries(thunkApi.getState());
    const categories = selectUserCategoriesOfInterest(thunkApi.getState());

    const seriesForYou = await getTrendingPodcastSeriesPagination({
      period,
      pageSize,
      categories,
      notInIds: trendingSeries.map((series) => series.id),
    });

    return seriesForYou;
  }
);

export const fetchSeriesToTryPaged = createAppAsyncThunk(
  FETCH_SERIES_TO_TRY_PAGED_TYPE,
  async ({ period, pageSize }: FetchSeriesByPeriodPaged, thunkApi) => {
    const seriesForYou = selectSeriesForYou(thunkApi.getState());
    const trendingSeries = selectTrendingSeries(thunkApi.getState());

    const seriesToTry = await getRandomPodcastSeriesPagination({
      period,
      pageSize,
      notInIds: trendingSeries
        .map((series) => series.id)
        .concat(seriesForYou.map((series) => series.id)),
    });

    return seriesToTry;
  }
);

export const userPodcastSeriesSlice = createSlice({
  name: "userPodcastSeries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecentlyPlayedSeries.fulfilled, (state, { payload }) => {
        state.recentlyPlayed = payload;
      })
      .addCase(fetchRecentlyPlayedSeries.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchTrendingSeriesPaged.fulfilled, (state, { payload }) => {
        state.trendingSeries = payload;
      })
      .addCase(fetchTrendingSeriesPaged.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchSeriesForYouPaged.fulfilled, (state, { payload }) => {
        state.seriesForYou = payload;
      })
      .addCase(fetchSeriesForYouPaged.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchSeriesToTryPaged.fulfilled, (state, { payload }) => {
        state.seriesToTry = payload;
      })
      .addCase(fetchSeriesToTryPaged.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(
        fetchSeriesByCategorySortedAndPaged.fulfilled,
        (state, { payload }) => {
          state.categoriesSeries = payload;
        }
      )
      .addCase(fetchSeriesByCategorySortedAndPaged.rejected, (_, { error }) => {
        console.error(error);
      });
  },
});

export const selectTrendingSeries = (state: RootState) =>
  state.userPodcasts.trendingSeries;

export const selectSeriesForYou = (state: RootState) =>
  state.userPodcasts.seriesForYou;

export const selectSeriesToTry = (state: RootState) =>
  state.userPodcasts.seriesToTry;

export const selectRecentlyPlayed = (state: RootState) =>
  state.userPodcasts.recentlyPlayed;

export const selectCategoriesSeries = (state: RootState) =>
  state.userPodcasts.categoriesSeries;

export default userPodcastSeriesSlice.reducer;

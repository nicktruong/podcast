import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRandomPodcastSeriesPagination,
  getTrendingPodcastSeriesPagination,
} from "@/firebase";
import { AsyncThunkConfig } from "@/hooks/redux";
import { getHistorySeries } from "@/firebase/history/getHistorySeries";

import { selectUser, selectUserCategoriesOfInterest } from "../user/userSlice";

import type { RootState } from "@/store";
import type { UserPodcastSeriesState } from "./interfaces";
import type { PodcastSeriesWithAuthor } from "@/common/interfaces";

const initialState: UserPodcastSeriesState = {
  seriesToTry: [], // random shows
  seriesForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  trendingSeries: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
};

export const getRecentlyPlayed = createAsyncThunk<
  PodcastSeriesWithAuthor[],
  undefined,
  AsyncThunkConfig
>("userPodcastSeries/getRecentlyPlayed", async (_, thunkApi) => {
  const user = selectUser(thunkApi.getState());
  const series = await getHistorySeries(user.history);

  return series;
});

export const getTrendingPodcastSeriesPaginationAction = createAsyncThunk(
  "userPodcastSeries/getTrendingPodcastSeriesPaginationAction",
  async ({ period, pageSize }: { period?: number; pageSize?: number }) => {
    const trendingPodcasts = await getTrendingPodcastSeriesPagination({
      period,
      pageSize,
    });

    return trendingPodcasts;
  }
);

export const getSeriesForYou = createAsyncThunk<
  PodcastSeriesWithAuthor[],
  { period?: number; pageSize?: number },
  AsyncThunkConfig
>(
  "userPodcastSeries/getSeriesForYou",
  async ({ period, pageSize }, thunkApi) => {
    const categories = selectUserCategoriesOfInterest(thunkApi.getState());
    const trendingSeries = selectTrendingSeries(thunkApi.getState());

    const seriesForYou = await getTrendingPodcastSeriesPagination({
      period,
      pageSize,
      categories,
      notInIds: trendingSeries.map((series) => series.id),
    });

    return seriesForYou;
  }
);

export const getSeriesToTry = createAsyncThunk<
  PodcastSeriesWithAuthor[],
  { period?: number; pageSize?: number },
  AsyncThunkConfig
>(
  "userPodcastSeries/getSeriesToTry",
  async ({ period, pageSize }, thunkApi) => {
    const trendingSeries = selectTrendingSeries(thunkApi.getState());
    const seriesForYou = selectSeriesForYou(thunkApi.getState());

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
      .addCase(getRecentlyPlayed.fulfilled, (state, { payload }) => {
        state.recentlyPlayed = payload;
      })
      .addCase(getRecentlyPlayed.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(
        getTrendingPodcastSeriesPaginationAction.fulfilled,
        (state, { payload }) => {
          state.trendingSeries = payload;
        }
      )
      .addCase(
        getTrendingPodcastSeriesPaginationAction.rejected,
        (_, { error }) => {
          console.error(error);
        }
      );

    builder
      .addCase(getSeriesForYou.fulfilled, (state, { payload }) => {
        state.seriesForYou = payload;
      })
      .addCase(getSeriesForYou.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(getSeriesToTry.fulfilled, (state, { payload }) => {
        state.seriesToTry = payload;
      })
      .addCase(getSeriesToTry.rejected, (state, { error }) => {
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

export default userPodcastSeriesSlice.reducer;

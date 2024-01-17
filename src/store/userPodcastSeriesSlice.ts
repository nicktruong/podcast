import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTrendingPodcastSeriesPagination } from "@/firebase/getTrendingPodcastSeriesPagination";
import { PodcastSeriesWithAuthor } from "@/common/interfaces/PodcastSeries";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { getRandomPodcastSeriesPagination } from "@/firebase/getRandomPodcastSeriesPagination";

import { RootState } from "./store";
import { selectUserCategoriesOfInterest } from "./userSlice";

interface UserPodcastSeriesState {
  seriesToTry: PodcastSeriesWithAuthor[];
  seriesForYou: PodcastSeriesWithAuthor[];
  recentlyPlayed: PodcastSeriesWithAuthor[];
  trendingSeries: PodcastSeriesWithAuthor[];
}

const initialState: UserPodcastSeriesState = {
  seriesToTry: [], // random shows
  seriesForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  trendingSeries: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
};

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

export default userPodcastSeriesSlice.reducer;

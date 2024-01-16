import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTrendingPodcastSeriesPagination } from "@/firebase/getTrendingPodcastSeriesPagination";
import { PodcastSeriesWithAuthor } from "@/common/interfaces/PodcastSeries";

import { RootState } from "./store";

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
  },
});

export const selectTrendingSeries = (state: RootState) =>
  state.userPodcasts.trendingSeries;

export default userPodcastSeriesSlice.reducer;

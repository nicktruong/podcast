import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTrendingPodcastSeriesPagination } from "@/firebase/getTrendingPodcastSeriesPagination";
import {
  PodcastSeriesDetail,
  PodcastSeriesWithAuthor,
} from "@/common/interfaces/PodcastSeries";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { getRandomPodcastSeriesPagination } from "@/firebase/getRandomPodcastSeriesPagination";
import { getSeriesDetail } from "@/firebase/getSeriesDetail";
import { getSeriesAuthor } from "@/firebase/getSeriesAuthor";
import { getEpisodesFromSeriesPagination } from "@/firebase/getEpisodesFromSeriesPagination";
import { Genders } from "@/common/constants/genders";
import { Roles } from "@/common/constants/roles";

import { RootState } from "./store";
import { selectUserCategoriesOfInterest } from "./userSlice";

interface UserPodcastSeriesState {
  seriesToTry: PodcastSeriesWithAuthor[];
  seriesForYou: PodcastSeriesWithAuthor[];
  recentlyPlayed: PodcastSeriesWithAuthor[];
  trendingSeries: PodcastSeriesWithAuthor[];
  loadingDetail: boolean;
  seriesDetail: PodcastSeriesDetail;
}

const initialState: UserPodcastSeriesState = {
  seriesToTry: [], // random shows
  seriesForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  trendingSeries: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
  loadingDetail: false,
  seriesDetail: {
    audienceSize: 0,
    category: "",
    coverUrl: "",
    createdAt: "",
    description: "",
    id: "",
    playCount: 0,
    podcasts: [],
    rating: 0,
    title: "",
    updatedAt: "",
    author: {
      categoriesOfInterest: [],
      dob: "",
      gender: Genders.NON_BINARY,
      id: "",
      name: "",
      roles: [Roles.LISTENER],
    },
  },
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

export const getSeriesDetailAction = createAsyncThunk<
  PodcastSeriesDetail,
  { seriesId: string },
  AsyncThunkConfig
>("userPodcastSeries/getSeriesDetailAction", async ({ seriesId }, thunkApi) => {
  const state = thunkApi.getState();
  const trendingSeries = selectTrendingSeries(state);
  const seriesForYou = selectSeriesForYou(state);
  const seriesToTry = selectSeriesToTry(state);
  const allSeries = trendingSeries.concat(seriesForYou).concat(seriesToTry);

  const cachedSeries = allSeries.find(({ id }) => id === seriesId);
  let series: PodcastSeriesWithAuthor | undefined = cachedSeries;

  if (!cachedSeries) {
    // fetch series from firestore
    series = await getSeriesDetail({ seriesId });
  }

  if (!series) {
    return thunkApi.rejectWithValue("No series found");
  }

  // fetch series author
  if (!series.author) {
    const author = await getSeriesAuthor({ seriesId });
    series.author = author;
  }

  // fetch all episodes from series, TODO: support pagination
  const podcasts = await getEpisodesFromSeriesPagination({ seriesId });

  const seriesDetail: PodcastSeriesDetail = { ...series, podcasts };

  return seriesDetail;
});

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

    builder.addCase(getSeriesDetailAction.pending, (state) => {
      state.loadingDetail = true;
    });

    builder.addCase(getSeriesDetailAction.fulfilled, (state, { payload }) => {
      state.loadingDetail = false;
      state.seriesDetail = payload;
    });

    builder.addCase(getSeriesDetailAction.rejected, (state, { error }) => {
      state.loadingDetail = false;
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

export const selectSeriesDetail = (state: RootState) =>
  state.userPodcasts.seriesDetail;

export const selectLoadingSeriesDetail = (state: RootState) =>
  state.userPodcasts.loadingDetail;

export default userPodcastSeriesSlice.reducer;

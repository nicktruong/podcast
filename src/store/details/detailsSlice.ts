import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  PodcastSeriesDetail,
  PodcastSeriesWithAuthor,
} from "@/common/interfaces";
import {
  getSeriesAuthor,
  getSeriesDetail,
  getEpisodesFromSeriesPagination,
} from "@/firebase";
import { AsyncThunkConfig } from "@/hooks";
import { Roles, Genders } from "@/common/enums";

import {
  selectSeriesToTry,
  selectSeriesForYou,
  selectTrendingSeries,
} from "../listenerPodcastSeries";
import { RootState } from "..";

import { DetailsState } from "./interfaces";

// TODO: Split to multiple fields
const initialState: DetailsState = {
  seriesDetail: {
    id: "",
    title: "",
    rating: 0,
    category: "",
    coverUrl: "",
    rateCount: 0,
    playCount: 0,
    podcasts: [],
    createdAt: "",
    updatedAt: "",
    description: "",
    audienceSize: 0,
    author: {
      id: "",
      dob: "",
      name: "",
      roles: [Roles.LISTENER],
      categoriesOfInterest: [],
      gender: Genders.NON_BINARY,
    },
  },
  episodeDetailId: "",
  loadingDetail: false,
};

// TODO: Split to multiple thunks
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

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setEpisodeId: (
      state,
      { payload }: PayloadAction<{ episodeId: string }>
    ) => {
      state.episodeDetailId = payload.episodeId;
    },
    setNewRating: (
      state,
      { payload }: PayloadAction<{ newRateCount: number; newRating: number }>
    ) => {
      state.seriesDetail.rating = payload.newRating;
      state.seriesDetail.rateCount = payload.newRateCount;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSeriesDetailAction.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(getSeriesDetailAction.fulfilled, (state, { payload }) => {
        state.loadingDetail = false;
        state.seriesDetail = payload;
      })
      .addCase(getSeriesDetailAction.rejected, (state, { error }) => {
        state.loadingDetail = false;
        console.error(error);
      });
  },
});

export const { setEpisodeId, setNewRating } = detailsSlice.actions;

export const selectSeriesDetail = (state: RootState) =>
  state.details.seriesDetail;

export const selectLoadingSeriesDetail = (state: RootState) =>
  state.details.loadingDetail;

export const selectEpisodeId = (state: RootState) =>
  state.details.episodeDetailId;

export const selectEpisodeDetail = createSelector(
  [selectSeriesDetail, selectEpisodeId],
  (seriesDetail, episodeId) => {
    return seriesDetail.podcasts.find((podcast) => podcast.id === episodeId);
  }
);

export default detailsSlice.reducer;

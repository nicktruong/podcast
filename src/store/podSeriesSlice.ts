import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getUserPodSeries } from "@/firebase/getUserPodSeries";

import { RootState } from "./store";

export interface PodSeriesState {
  podSeries: {
    id: string;
    title: string;
    coverUrl: string;
    categoryId: string;
    description: string;
    rating: number;
    playCount: number;
    audienceSize: number;
    createdAt: string;
    updatedAt: string;
  };
  loading: boolean;
  hasPodSeries: boolean;
}

const initialState: PodSeriesState = {
  podSeries: {
    id: "",
    title: "",
    coverUrl: "",
    categoryId: "",
    description: "",
    rating: 0,
    playCount: 0,
    audienceSize: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  loading: false,
  hasPodSeries: false,
};

export const fetchCreatorPodSeries = createAsyncThunk(
  "podSeries/fetchByCreatorId",
  async (creatorId: string) => {
    const podSeries = await getUserPodSeries(creatorId);

    const { categoryId, createdAt, updatedAt } = podSeries;

    return {
      ...podSeries,
      // As redux doesn't allow non-serializable data in the state
      categoryId: categoryId?.path,
      createdAt: createdAt?.toDate().toISOString(),
      updatedAt: updatedAt?.toDate().toISOString(),
    };
  }
);

export const podSeriesSlice = createSlice({
  name: "podSeries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCreatorPodSeries.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCreatorPodSeries.fulfilled, (state, { payload }) => {
      state.loading = false;

      const initialPodSeries = initialState.podSeries;

      const {
        id,
        title = initialPodSeries.title,
        rating = initialPodSeries.rating,
        coverUrl = initialPodSeries.coverUrl,
        playCount = initialPodSeries.playCount,
        createdAt = initialPodSeries.createdAt,
        updatedAt = initialPodSeries.updatedAt,
        categoryId = initialPodSeries.categoryId,
        description = initialPodSeries.description,
        audienceSize = initialPodSeries.audienceSize,
      } = payload;

      if (id) {
        state.hasPodSeries = true;
      }

      state.podSeries = {
        id,
        title,
        rating,
        coverUrl,
        playCount,
        createdAt,
        updatedAt,
        categoryId,
        description,
        audienceSize,
      };
    });

    builder.addCase(fetchCreatorPodSeries.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectLoading = (state: RootState) => state.podSeries.loading;

export const selectHasPodSeries = (state: RootState) => state.podSeries.loading;

export const selectPodSeriesMetadata = createSelector(
  [selectLoading, selectHasPodSeries],
  (loading, hasPodSeries) => ({ loading, hasPodSeries })
);

export const selectPodSeries = (state: RootState) => state.podSeries.podSeries;

export default podSeriesSlice.reducer;

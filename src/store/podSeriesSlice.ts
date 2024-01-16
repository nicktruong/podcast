import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { uploadFile } from "@/firebase/uploadFile";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { resizeFile } from "@/common/utils/resize-image";
import { downloadPhoto } from "@/firebase/downloadPhoto";
import { getUserPodSeries } from "@/firebase/getUserPodSeries";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";
import { createPodcastSeries } from "@/firebase/createPodcastSeries";
import { CreateSeriesSteps } from "@/common/constants/CreateSeriesSteps";
import { CreatePodcastSeries } from "@/common/interfaces/CreatePodcastSeries";

import { RootState } from "./store";
import { selectUserId } from "./userSlice";

export interface PodSeriesState {
  image?: string;
  loading: boolean;
  hasPodSeries: boolean;
  step: CreateSeriesSteps;
  podSeries: PodcastSeries;
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
  image: undefined,
  hasPodSeries: false,
  step: CreateSeriesSteps.INPUT_SERIES_DETAILS,
};

export const fetchSeriesImage = createAsyncThunk<
  Blob | undefined,
  undefined,
  AsyncThunkConfig
>("podSeries/fetchSeriesImage", async (_, thunkApi) => {
  const coverUrl = selectPodSeries(thunkApi.getState()).coverUrl;

  if (coverUrl) {
    const blob = await downloadPhoto(coverUrl);

    return blob;
  }
});

export const createPodcastSeriesAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkConfig
>("podSeries/create", async (_, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());
  const podSeries = selectPodSeries(thunkApi.getState());

  await createPodcastSeries(podSeries, userId);
});

// TODO: Cron job to clean img if not used for series
export const uploadSeriesCover = createAsyncThunk(
  "podSeries/uploadCover",
  async (file: File) => {
    const image = await resizeFile(file, { width: 300, height: 300 });

    const { fullPath } = uploadFile("photos", image);

    const src = URL.createObjectURL(file);

    return { fullPath, image: src };
  }
);

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
  reducers: {
    setSeriesDetails: (
      state,
      action: PayloadAction<Partial<CreatePodcastSeries>>
    ) => {
      state.podSeries = {
        ...state.podSeries,
        ...action.payload,
      };

      state.step = CreateSeriesSteps.UPLOAD_SERIES_COVER_IMG;
    },
  },
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

    builder.addCase(fetchCreatorPodSeries.rejected, (state, { error }) => {
      console.error({ error });
      state.loading = false;
    });

    builder.addCase(uploadSeriesCover.fulfilled, (state, action) => {
      state.step = CreateSeriesSteps.CONFIRM_DETAILS_AND_CREATION;
      state.podSeries.coverUrl = action.payload.fullPath;
      state.image = action.payload.image;
    });

    builder.addCase(createPodcastSeriesAction.fulfilled, (state) => {
      state.step = CreateSeriesSteps.INPUT_SERIES_DETAILS;
      state.hasPodSeries = true;
    });

    builder.addCase(createPodcastSeriesAction.rejected, (_, { error }) => {
      console.error(error);
    });

    builder.addCase(fetchSeriesImage.fulfilled, (state, action) => {
      if (action.payload) {
        state.image = URL.createObjectURL(action.payload);
      }
    });

    builder.addCase(fetchSeriesImage.rejected, (_, { error }) => {
      console.error(error);
    });
  },
});

export const selectLoading = (state: RootState) => state.podSeries.loading;

export const selectHasPodSeries = (state: RootState) =>
  state.podSeries.hasPodSeries;

export const selectPodSeriesMetadata = createSelector(
  [selectLoading, selectHasPodSeries],
  (loading, hasPodSeries) => ({ loading, hasPodSeries })
);

export const selectPodSeries = (state: RootState) => state.podSeries.podSeries;

export const selectStep = (state: RootState) => state.podSeries.step;

export const selectCoverImage = (state: RootState) => state.podSeries.image;

export const { setSeriesDetails } = podSeriesSlice.actions;

export default podSeriesSlice.reducer;

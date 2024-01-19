import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  publishPod,
  countCreatorEpisodes,
  getCreatorsPodcastsPagination,
  getPodcastsOfCreatorPagination,
} from "@/firebase";
import { AsyncThunkConfig } from "@/hooks/redux";
import { PodcastStatus, EpisodeCreationSteps } from "@/common/enums";

import { selectUserId } from "../user/userSlice";

import type { RootState } from "@/store";
import type { PodcastState } from "./interfaces";
import type { Podcast, CreatorsPodcasts } from "@/common/interfaces";

const initialState: PodcastState = {
  pod: {
    id: "",
    title: "",
    rating: 0,
    seriesId: "",
    playCount: 0,
    rateCount: 0,
    createdAt: "", // in ISO format
    updatedAt: "", // in ISO format
    pathToFile: "",
    description: "",
    publishedDate: "", // in ISO format
    status: PodcastStatus.DRAFT,
  },
  pods: [],
  episodesCount: 0,
  uploading: false,
  loadingPods: false,
  creatorsPodcasts: [],
  progressInPercent: 0,
  uploadStep: EpisodeCreationSteps.UPLOAD_AUDIO,
};

export const getCurrentCreatorPodcastsPaginationAction = createAsyncThunk<
  Podcast[],
  { offset?: Date; pageSize?: number },
  AsyncThunkConfig
>(
  "pod/getCurrentCreatorPodcastsPagination",
  async ({ offset, pageSize }, thunkApi) => {
    const userId = selectUserId(thunkApi.getState());

    const pods = await getPodcastsOfCreatorPagination({
      creatorId: userId,
      offset,
      pageSize,
    });

    return pods;
  }
);

export const countEpisodesAction = createAsyncThunk<
  number,
  undefined,
  AsyncThunkConfig
>("pod/countEpisodesAction", async (_, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());

  const count = await countCreatorEpisodes(userId);

  return count;
});

export const publishPodAction = createAsyncThunk<
  { creatorsPodcasts: CreatorsPodcasts; pod: Podcast },
  undefined,
  AsyncThunkConfig
>("pod/publish", async (_, thunkApi) => {
  if (selectUploading(thunkApi.getState()) === true) {
    return thunkApi.rejectWithValue("Wait for mp3 file done upload");
  }

  const userId = selectUserId(thunkApi.getState());
  const pod = selectPodInfo(thunkApi.getState());
  const creatorsPodcasts = await publishPod(pod, userId);

  return { pod, creatorsPodcasts };
});

export const getCreatorsPodsPaginationAction = createAsyncThunk<
  CreatorsPodcasts[],
  { offset?: Date; pageSize?: number },
  AsyncThunkConfig
>("pod/getPodsPagination", async ({ pageSize, offset }, thunkApi) => {
  const userId = selectUserId(thunkApi.getState());
  const pods = await getCreatorsPodcastsPagination({
    creatorId: userId,
    offset,
    pageSize,
  });

  return pods;
});

export const podSlice = createSlice({
  name: "pod",
  initialState: initialState,
  reducers: {
    setPrevStep: (state) => {
      switch (state.uploadStep) {
        case EpisodeCreationSteps.REVIEW_PUBLISH:
          state.uploadStep = EpisodeCreationSteps.EDIT_DETAILS;
          break;

        default:
          break;
      }
    },
    resetUploadPodState: (state) => {
      state.pod = initialState.pod;
      state.uploading = false;
      state.progressInPercent = 0;
      state.uploadStep = EpisodeCreationSteps.UPLOAD_AUDIO;
    },
    setPodUploadDetails: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        publishedDate: string;
        // status: PodStatus;
      }>
    ) => {
      state.pod = { ...state.pod, ...action.payload };
    },
    setPodPathToFile: (state, action: PayloadAction<string>) => {
      state.uploading = true;
      state.progressInPercent = 0;
      state.pod.pathToFile = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progressInPercent = action.payload;

      if (action.payload === 100) {
        state.uploading = false;
      }
    },
    setUploadStep: (state, action: PayloadAction<EpisodeCreationSteps>) => {
      state.uploadStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishPodAction.fulfilled, (state, action) => {
      state.creatorsPodcasts = [action.payload.creatorsPodcasts];
      state.pods.unshift(action.payload.pod);
      state.episodesCount += 1;
      state.pod = initialState.pod;
      state.progressInPercent = 0;
      state.uploadStep = EpisodeCreationSteps.UPLOAD_AUDIO;
    });

    builder.addCase(publishPodAction.rejected, (_, { error }) => {
      console.error(error);
    });

    builder.addCase(getCreatorsPodsPaginationAction.pending, (state) => {
      state.loadingPods = true;
    });

    builder.addCase(
      getCreatorsPodsPaginationAction.fulfilled,
      (state, action) => {
        state.loadingPods = false;
        state.creatorsPodcasts = action.payload;
      }
    );

    builder.addCase(
      getCreatorsPodsPaginationAction.rejected,
      (state, action) => {
        state.loadingPods = false;
        console.error(action.error);
      }
    );

    builder.addCase(countEpisodesAction.fulfilled, (state, action) => {
      state.episodesCount = action.payload;
    });

    builder.addCase(countEpisodesAction.rejected, (_, { error }) => {
      console.error(error);
    });

    builder.addCase(
      getCurrentCreatorPodcastsPaginationAction.fulfilled,
      (state, action) => {
        state.pods = action.payload;
      }
    );

    builder.addCase(
      getCurrentCreatorPodcastsPaginationAction.rejected,
      (state, { error }) => {
        console.error(error);
      }
    );
  },
});

export const selectEpisodesCount = (state: RootState) =>
  state.pod.episodesCount;
export const selectCreatorsPodcasts = (state: RootState) =>
  state.pod.creatorsPodcasts;
export const selectPods = (state: RootState) => state.pod.pods;
export const selectPodInfo = (state: RootState) => state.pod.pod;
export const selectUploading = (state: RootState) => state.pod.uploading;
export const selectUploadStep = (state: RootState) => state.pod.uploadStep;
export const selectProgress = (state: RootState) => state.pod.progressInPercent;

export const {
  setPrevStep,
  setProgress,
  setUploadStep,
  setPodPathToFile,
  resetUploadPodState,
  setPodUploadDetails,
} = podSlice.actions;

export default podSlice.reducer;

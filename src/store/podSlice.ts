import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { publishPod } from "@/firebase/publishPod";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { Pod } from "@/common/interfaces/pod.interface";
import { countEpisodes } from "@/firebase/countEpisodes";
import { PodStatus } from "@/common/constants/pod-status";
import { CreatorsPodcasts } from "@/common/interfaces/ICreatorsPodcasts";
import { CreateEpisodeSteps } from "@/common/constants/create-episode-steps";
import { getCreatorsPodsPagination } from "@/firebase/getCreatorsPodsPagination";
import { getCurrentCreatorPodcastsPagination } from "@/firebase/getCurrentCreatorPodcastsPagination";

import { RootState } from "./store";
import { selectUserId } from "./userSlice";

interface PodState {
  pod: Pod;
  pods: Pod[];
  uploading: boolean;
  loadingPods: boolean;
  episodesCount: number;
  progressInPercent: number;
  uploadStep: CreateEpisodeSteps;
  creatorsPodcasts: CreatorsPodcasts[];
}

const initialState: PodState = {
  pod: {
    id: "",
    title: "",
    rating: 0,
    seriesId: "",
    playCount: 0,
    createdAt: "", // in ISO format
    updatedAt: "", // in ISO format
    pathToFile: "",
    description: "",
    publishedDate: "", // in ISO format
    status: PodStatus.DRAFT,
  },
  pods: [],
  episodesCount: 0,
  uploading: false,
  loadingPods: false,
  creatorsPodcasts: [],
  progressInPercent: 0,
  uploadStep: CreateEpisodeSteps.UPLOAD_AUDIO,
};

export const getCurrentCreatorPodcastsPaginationAction = createAsyncThunk<
  Pod[],
  { offset?: Date; pageSize?: number },
  AsyncThunkConfig
>(
  "pod/getCurrentCreatorPodcastsPagination",
  async ({ offset, pageSize }, thunkApi) => {
    const userId = selectUserId(thunkApi.getState());

    const pods = await getCurrentCreatorPodcastsPagination({
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

  const count = await countEpisodes(userId);

  return count;
});

export const publishPodAction = createAsyncThunk<
  { creatorsPodcasts: CreatorsPodcasts; pod: Pod },
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
  const pods = await getCreatorsPodsPagination({
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
        case CreateEpisodeSteps.REVIEW_PUBLISH:
          state.uploadStep = CreateEpisodeSteps.EDIT_DETAILS;
          break;

        default:
          break;
      }
    },
    resetUploadPodState: (state) => {
      state.pod = initialState.pod;
      state.uploading = false;
      state.progressInPercent = 0;
      state.uploadStep = CreateEpisodeSteps.UPLOAD_AUDIO;
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
    setUploadStep: (state, action: PayloadAction<CreateEpisodeSteps>) => {
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
      state.uploadStep = CreateEpisodeSteps.UPLOAD_AUDIO;
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

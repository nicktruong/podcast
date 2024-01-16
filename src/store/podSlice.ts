import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { publishPod } from "@/firebase/publishPod";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { Pod } from "@/common/interfaces/pod.interface";
import { PodStatus } from "@/common/constants/pod-status";
import { CreatorsPodcasts } from "@/common/interfaces/ICreatorsPodcasts";
import { CreateEpisodeSteps } from "@/common/constants/create-episode-steps";
import { getCreatorsPodsPagination } from "@/firebase/getCreatorsPodsPagination";

import { RootState } from "./store";
import { selectUserId } from "./userSlice";

interface PodState {
  pod: Pod;
  pods: Pod[];
  creatorsPodcasts: CreatorsPodcasts[];
  uploading: boolean;
  loadingPods: boolean;
  progressInPercent: number;
  uploadStep: CreateEpisodeSteps;
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
    published_date: "", // in ISO format
    status: PodStatus.DRAFT,
  },
  pods: [],
  creatorsPodcasts: [],
  uploading: false,
  loadingPods: false,
  progressInPercent: 0,
  uploadStep: CreateEpisodeSteps.UPLOAD_AUDIO,
};

export const publishPodAction = createAsyncThunk<
  CreatorsPodcasts,
  undefined,
  AsyncThunkConfig
>("pod/publish", async (_, thunkApi) => {
  if (selectUploading(thunkApi.getState()) === true) {
    return thunkApi.rejectWithValue("Wait for mp3 file done upload");
  }

  const userId = selectUserId(thunkApi.getState());
  const pod = selectPodInfo(thunkApi.getState());
  const creatorsPodcasts = await publishPod(pod, userId);

  return creatorsPodcasts;
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
        published_date: string;
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
      state.creatorsPodcasts = [action.payload];
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
  },
});

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

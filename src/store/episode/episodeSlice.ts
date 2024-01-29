import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { populateEpisode } from "@/firebase/utils";
import { EpisodeCreationSteps } from "@/common/enums";
import { publishEpisode, fetchEpisodesPagedFromCreatorId } from "@/firebase";

import { selectPodcast } from "../podcast";
import { selectUser, setUser } from "../user/userSlice";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

import type { RootState } from "@/store";
import type { EpisodeState } from "./interfaces";

const initialState: EpisodeState = {
  episodeCreationData: {
    title: "",
    pathToFile: "",
    description: "",
  },
  episodes: [],
  uploading: false,
  loadingEpisodes: true,
  audioUploadProgressInPercent: 0,
  uploadStep: EpisodeCreationSteps.UPLOAD_AUDIO,
};

export const getEpisodesFromCreatorPaged = createAppAsyncThunk(
  "episode/fetchEpisodesPagedFromCreator",
  async ({
    creatorId,
    offset,
    pageSize,
  }: {
    creatorId: string;
    offset?: Date;
    pageSize?: number;
  }) => {
    const episodes = await fetchEpisodesPagedFromCreatorId({
      creatorId,
      offset,
      pageSize,
    });

    return episodes;
  }
);

export const publishEpisodeAction = createAppAsyncThunk(
  "episode/publish",
  async (_, thunkApi) => {
    if (selectUploading(thunkApi.getState()) === true) {
      return thunkApi.rejectWithValue("Please wait. Uploading audio...");
    }

    const podcast = selectPodcast(thunkApi.getState());

    const user = selectUser(thunkApi.getState());

    if (!podcast || !user?.id) {
      return thunkApi.rejectWithValue("Please create podcast first!");
    }

    const episode = selectEpisodeInfo(thunkApi.getState());

    const newEpisode = await publishEpisode(episode, user.id, podcast.id);

    thunkApi.dispatch(setUser({ episodeCount: (user.episodeCount ?? 0) + 1 }));

    return populateEpisode(newEpisode);
  }
);

export const podSlice = createSlice({
  name: "pod",
  initialState,
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
      state.episodeCreationData = initialState.episodeCreationData;
      state.uploading = false;
      state.audioUploadProgressInPercent = 0;
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
      state.episodeCreationData = {
        ...state.episodeCreationData,
        ...action.payload,
      };
      state.uploadStep = EpisodeCreationSteps.REVIEW_PUBLISH;
    },
    setPathToAudioFile: (state, action: PayloadAction<string>) => {
      state.uploading = true;
      state.audioUploadProgressInPercent = 0;
      state.episodeCreationData.pathToFile = action.payload; // 1
      state.uploadStep = EpisodeCreationSteps.EDIT_DETAILS;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.audioUploadProgressInPercent = action.payload;

      if (action.payload === 100) {
        state.uploading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishEpisodeAction.fulfilled, (state, action) => {
        state.audioUploadProgressInPercent = 0;
        state.episodeCreationData = initialState.episodeCreationData;
        state.uploadStep = EpisodeCreationSteps.UPLOAD_AUDIO;
        state.episodes = [
          { ...action.payload, id: nanoid() },
          ...state.episodes,
        ];
      })
      .addCase(publishEpisodeAction.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(getEpisodesFromCreatorPaged.fulfilled, (state, action) => {
        state.loadingEpisodes = false;
        state.episodes = action.payload;
      })
      .addCase(getEpisodesFromCreatorPaged.rejected, (state, { error }) => {
        state.loadingEpisodes = false;
        console.error(error);
      });
  },
});

export const selectEpisodesAreLoading = (state: RootState) =>
  state.pod.loadingEpisodes;

export const selectEpisodeInfo = (state: RootState) =>
  state.pod.episodeCreationData;

export const selectProgress = (state: RootState) =>
  state.pod.audioUploadProgressInPercent;

export const selectPods = (state: RootState) => state.pod.episodes;

export const selectUploading = (state: RootState) => state.pod.uploading;

export const selectUploadStep = (state: RootState) => state.pod.uploadStep;

export const selectEpisodesOfCreator = (state: RootState) => state.pod.episodes;

export const {
  setPrevStep,
  setProgress,
  setPathToAudioFile,
  resetUploadPodState,
  setPodUploadDetails,
} = podSlice.actions;

export default podSlice.reducer;

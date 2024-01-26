import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { publishEpisode, fetchEpisodesPagedFromCreatorId } from "@/firebase";
import { EpisodeCreationSteps } from "@/common/enums";
import { populateEpisode } from "@/firebase/utils";

import { selectUserId } from "../user/userSlice";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { selectPodcast } from "../podcast";

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
  loadingEpisodes: false,
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
  async (
    _,
    thunkApi
  ) /*: Promise<{ creatorsPodcasts: CreatorsPodcasts; pod: Episode }> */ => {
    if (selectUploading(thunkApi.getState()) === true) {
      return thunkApi.rejectWithValue("Please wait. Uploading audio...");
    }

    const podcast = selectPodcast(thunkApi.getState());

    const userId = selectUserId(thunkApi.getState());

    if (!podcast || !userId) {
      return thunkApi.rejectWithValue("Please create podcast first!");
    }

    const episode = selectEpisodeInfo(thunkApi.getState());

    const newEpisode = await publishEpisode(episode, userId, podcast.id);

    return populateEpisode({ id: "", ...newEpisode });
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
        title: string; // 2
        description: string; // 3
        publishedDate: string; // 4
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
          ...state.episodes,
          { ...action.payload, id: nanoid() },
        ];
      })
      .addCase(publishEpisodeAction.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(getEpisodesFromCreatorPaged.fulfilled, (state, action) => {
        state.episodes = action.payload;
      })
      .addCase(getEpisodesFromCreatorPaged.rejected, (state, { error }) => {
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

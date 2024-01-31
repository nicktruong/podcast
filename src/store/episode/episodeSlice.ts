import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { EPISODE_CREATION_STEPS } from "@/common/enums";

import { publishEpisodeAction, fetchEpisodesFromCreatorPaged } from "./thunks";

import type { EpisodeState } from "./interfaces";

const initialState: EpisodeState = {
  episodeCreationData: {
    title: "",
    pathToFile: "",
    description: "",
    pathToImgFile: "",
  },
  episodes: [],
  uploading: false,
  loadingEpisodes: true,
  audioUploadProgressInPercent: 0,
  uploadStep: EPISODE_CREATION_STEPS.UPLOAD_AUDIO,
};

export const podSlice = createSlice({
  name: "pod",
  initialState,
  reducers: {
    setPrevStep: (state) => {
      switch (state.uploadStep) {
        case EPISODE_CREATION_STEPS.REVIEW_PUBLISH:
          state.uploadStep = EPISODE_CREATION_STEPS.EDIT_DETAILS;
          break;

        default:
          break;
      }
    },
    resetUploadPodState: (state) => {
      state.episodeCreationData = initialState.episodeCreationData;
      state.uploading = false;
      state.audioUploadProgressInPercent = 0;
      state.uploadStep = EPISODE_CREATION_STEPS.UPLOAD_AUDIO;
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
      state.uploadStep = EPISODE_CREATION_STEPS.UPLOAD_PHOTO;
    },
    setPathToAudioFile: (state, action: PayloadAction<string>) => {
      state.uploading = true;
      state.audioUploadProgressInPercent = 0;
      state.episodeCreationData.pathToFile = action.payload; // 1
      state.uploadStep = EPISODE_CREATION_STEPS.EDIT_DETAILS;
    },
    setPathToImg: (state, action: PayloadAction<string>) => {
      state.episodeCreationData.pathToImgFile = action.payload;
      state.uploadStep = EPISODE_CREATION_STEPS.REVIEW_PUBLISH;
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
        state.uploadStep = EPISODE_CREATION_STEPS.UPLOAD_AUDIO;
        state.episodes = [
          { ...action.payload, id: nanoid() },
          ...state.episodes,
        ];
      })
      .addCase(publishEpisodeAction.rejected, (_, { error }) => {
        console.error(error);
      });

    builder
      .addCase(fetchEpisodesFromCreatorPaged.fulfilled, (state, action) => {
        state.loadingEpisodes = false;
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodesFromCreatorPaged.rejected, (state, { error }) => {
        state.loadingEpisodes = false;
        console.error(error);
      });
  },
});

export const {
  setPrevStep,
  setProgress,
  setPathToImg,
  setPathToAudioFile,
  resetUploadPodState,
  setPodUploadDetails,
} = podSlice.actions;

export default podSlice.reducer;

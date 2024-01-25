import { intervalToDuration } from "date-fns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { downloadFileFromStorage, updatePlayCount } from "@/firebase";

import { addHistoryAction } from "../history";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

import {
  SLICE_NAME,
  initialState,
  DOWNLOAD_AND_PLAY_AUDIO_ACTION,
  UPDATE_AUDIO_PLAYED_COUNT_ACTION,
} from "./constants";

import type {
  DownloadAndPlayAudioParameters,
  DownloadAndPlayAudioReturnType,
} from "./interfaces";
import type { RootState } from "@/store";

export const downloadAndPlayAudio = createAppAsyncThunk(
  DOWNLOAD_AND_PLAY_AUDIO_ACTION,
  async (
    {
      title,
      author,
      coverUrl,
      podcastId,
      episodeId,
      pathToFile,
    }: DownloadAndPlayAudioParameters,
    thunkApi
  ): Promise<DownloadAndPlayAudioReturnType | undefined> => {
    const audioUrl = await downloadFileFromStorage(pathToFile);

    // TODO: dispatch to history thunk
    await thunkApi.dispatch(addHistoryAction(podcastId));

    return { title, author, coverUrl, podcastId, episodeId, audioUrl };
  }
);

export const updateAudioPlayedCount = createAppAsyncThunk(
  UPDATE_AUDIO_PLAYED_COUNT_ACTION,
  async (_, thunkApi) => {
    const { podcastId, episodeId } = selectAudioState(thunkApi.getState());

    await updatePlayCount({ podcastId, episodeId });
  }
);

export const audioSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    playAudio: (state) => {
      state.playing = true;
    },
    pauseAudio: (state) => {
      state.playing = false;
    },
    resetAudio: () => {
      return initialState;
    },
    setPassedTimeInSeconds: (state, action: PayloadAction<number>) => {
      state.passedTimeInSeconds = action.payload;
      state.passedDuration = intervalToDuration({
        start: 0,
        end: action.payload * 1000,
      });
      state.durationRemain = intervalToDuration({
        start: 0,
        end: (state.durationInSeconds - action.payload) * 1000,
      });

      if (action.payload === state.durationInSeconds) {
        state.playing = false;
      }
    },
    setDurationInSeconds: (state, action: PayloadAction<number>) => {
      state.durationInSeconds = action.payload;
      state.audioDuration = state.durationRemain = intervalToDuration({
        start: 0,
        end: action.payload * 1000,
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(downloadAndPlayAudio.pending, (state) => {
        state.downloaded = false;
        state.loadingAudio = true;
      })
      .addCase(downloadAndPlayAudio.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
          playing: true,
          downloaded: true,
          loadingAudio: false,
        };
      })
      .addCase(downloadAndPlayAudio.rejected, (state, { error }) => {
        console.error(error);
        state.downloaded = false;
        state.loadingAudio = false;
      });

    builder.addCase(updateAudioPlayedCount.rejected, (_, { error }) => {
      console.error(error);
    });
  },
});

export const {
  playAudio,
  pauseAudio,
  resetAudio,
  setDurationInSeconds,
  setPassedTimeInSeconds,
} = audioSlice.actions;

export const selectAudioState = (state: RootState) => state.audio;

export default audioSlice.reducer;

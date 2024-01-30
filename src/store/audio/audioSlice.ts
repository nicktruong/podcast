import { intervalToDuration } from "date-fns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { downloadAndPlayAudio, updateAudioPlayedCount } from "./thunks";

import type { AudioState } from "./interfaces";

export const initialState: AudioState = {
  title: "",
  author: "",
  coverUrl: "",
  audioUrl: "",
  podcastId: "",
  episodeId: "",
  audioDuration: {},
  durationRemain: {},
  passedDuration: {},
  playing: false,
  downloaded: false,
  loadingAudio: false,
  durationInSeconds: 0,
  passedTimeInSeconds: 0,
};

export const audioSlice = createSlice({
  name: "audio",
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

export default audioSlice.reducer;

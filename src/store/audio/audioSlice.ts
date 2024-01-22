import { Duration, intervalToDuration } from "date-fns";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AsyncThunkConfig } from "@/hooks/redux";
import { downloadAudioFromStorage } from "@/firebase";

import { selectSeriesDetail } from "../details";

import type {
  DownloadAndPlayAudioParameters,
  DownloadAndPlayAudioReturnType,
} from "./interfaces";
import type { RootState } from "@/store";

interface AudioState {
  title: string;
  author: string;
  coverUrl: string;
  audioUrl: string;
  episodeId: string;
  audioDuration: Duration;
  durationRemain: Duration; // durationRemain = audioDuration - passedDuration
  passedDuration: Duration;
  playing: boolean;
  downloaded: boolean;
  loadingAudio: boolean;
  durationInSeconds: number;
  passedTimeInSeconds: number;
}

const initialState: AudioState = {
  title: "",
  author: "",
  coverUrl: "",
  audioUrl: "",
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

export const downloadAndPlayAudio = createAsyncThunk<
  DownloadAndPlayAudioReturnType,
  DownloadAndPlayAudioParameters,
  AsyncThunkConfig
>(
  "userPodcastSeries/downloadAndPlayAudio",
  async ({ episodeId, pathToFile }, thunkApi) => {
    const audioUrl = await downloadAudioFromStorage(pathToFile);

    const seriesDetail = selectSeriesDetail(thunkApi.getState());

    return { episodeId, audioUrl, seriesDetail };
  }
);

export const audioSlice = createSlice({
  name: "userPodcastSeries",
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
      .addCase(
        downloadAndPlayAudio.fulfilled,
        (state, { payload: { episodeId, audioUrl, seriesDetail } }) => {
          state.playing = true;
          state.downloaded = true;
          state.audioUrl = audioUrl;
          state.loadingAudio = false;
          state.episodeId = episodeId;
          state.title = seriesDetail.title;
          state.coverUrl = seriesDetail.coverUrl;
          state.author = seriesDetail.author?.name ?? "";
        }
      )
      .addCase(downloadAndPlayAudio.rejected, (state, { error }) => {
        console.error(error);
        state.downloaded = false;
        state.loadingAudio = false;
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

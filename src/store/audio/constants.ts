import { AudioState } from "./interfaces";

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

export const SLICE_NAME = "audio";

export const DOWNLOAD_AND_PLAY_AUDIO_ACTION = `${SLICE_NAME}/downloadAndPlayAudio`;

export const UPDATE_AUDIO_PLAYED_COUNT_ACTION = `${SLICE_NAME}/updateAudioPlayedCount`;

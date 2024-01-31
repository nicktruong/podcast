import { Duration } from "date-fns";

export interface AudioState {
  title: string;
  author: string;
  coverUrl: string;
  audioUrl: string;
  podcastId: string;
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

export interface DownloadAndPlayAudioReturnType {
  audioUrl: string;
}

export interface DownloadAndPlayAudioParameters {
  pathToFile: string;
}

export interface DownloadAndPlayAudioParameters {
  title: string;
  author: string;
  coverUrl: string;
  podcastId: string;
  episodeId: string;
  pathToFile: string;
}

export interface AudioInfo {
  title: string;
  author: string;
  coverUrl: string;
  podcastId: string;
  episodeId: string;
}

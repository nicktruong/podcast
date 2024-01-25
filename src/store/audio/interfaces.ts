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
  title: string;
  author: string;
  audioUrl: string;
  coverUrl: string;
  episodeId: string;
  podcastId: string;
}

export interface DownloadAndPlayAudioParameters {
  title: string;
  author: string;
  coverUrl: string;
  podcastId: string;
  episodeId: string;
  pathToFile: string;
}

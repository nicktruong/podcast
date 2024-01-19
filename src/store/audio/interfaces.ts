import type { PodcastSeriesDetail } from "@/common/interfaces";

export interface DownloadAndPlayAudioReturnType {
  audioUrl: string;
  episodeId: string;
  seriesDetail: PodcastSeriesDetail;
}

export interface DownloadAndPlayAudioParameters {
  episodeId: string;
  pathToFile: string;
}
